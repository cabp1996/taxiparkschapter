import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Client, TableConfig } from '../../../shared/interfaces';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ClientService } from '../../services/client.service';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { FilterClientsPipe } from '../../pipes/filter-clients.pipe';
import { AlertConfirmationComponent } from '../../../shared/components/alert-confirmation/alert-confirmation.component';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  clientsTableConfig: TableConfig = {
    columns: [
      {
        header: 'User',
        width: '30%',
      },
      {
        header: 'Total Rides',
        width: '10%',
      },
      {
        header: 'Total Finished',
        width: '10%',
      },
      {
        header: 'Home Location',
        width: '20%',
      },
      {
        header: 'Work Location',
        width: '20%',
      },
      {
        header: '',
        width: '10%',
      },
    ],
    rows: [],
  };

  clientForm!: FormGroup;
  searchText: FormControl = new FormControl('');
  clients: Client[] = [];
  currentClient: Client | null = null;

  isClientModalOpen: boolean = false;
  isLoading: boolean = false;
  isConfirmationAlertOpen: boolean = false;

  @ViewChild('modalConfirmationAlert')
  modalConfirmationAlert!: AlertConfirmationComponent;

  @ViewChild('fileInput') avatarFileInput!: FileInputComponent;

  private _onDestroy$ = new Subject();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _clientService: ClientService,
    private readonly _fileUploadService: FileUploadService,
    private readonly _snackbarService: SnackbarService,
    private readonly _filterClientsPipe: FilterClientsPipe
  ) {
    this.initializeClientForm();
  }

  initializeClientForm(): void {
    this.clientForm = this._fb.group({
      file: [null],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      homeLocation: ['', [Validators.required, Validators.minLength(4)]],
      workLocation: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.getAllClients();
    this.onSearchTextChange();
  }

  getAllClients(): void {
    this._clientService.getAllClients().subscribe((data) => {
      this.clients = [...data];
      this.filterTable('');
    });
  }

  onSearchTextChange(): void {
    this.searchText.valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((value) => {
        this.filterTable(value);
      });
  }

  filterTable(clientName: string): void {
    this.clientsTableConfig.rows = this._filterClientsPipe
      .transform(this.clients, clientName)
      .map((client) => {
        return {
          id: client.id?.toString(),
          rowItems: [
            {
              user: {
                avatar:
                  client.fileUrl ||
                  'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
                name: client.name + ' ' + client.lastName,
                phone: client.phone,
              },
            },
            {
              text: client.totalRides.toString(),
            },
            {
              text: client.totalFinished.toString(),
            },
            {
              text: client.homeLocation,
            },
            {
              text: client.workLocation,
            },
            {
              actions: [
                {
                  icon: 'fa fa-pencil',
                  callback: () => {
                    this.startUpdatingClient(client.id!);
                  },
                },
                {
                  icon: 'fa fa-trash',
                  callback: () => {
                    this.deleteClient(client.id!);
                  },
                },
              ],
            },
          ],
        };
      });
  }

  startUpdatingClient(id: number): void {
    this.currentClient = this.clients.find((client) => client.id === id)!;

    const { name, lastName, homeLocation, workLocation } = this.currentClient;

    this.clientForm.patchValue({
      name,
      lastName,
      homeLocation,
      workLocation,
    });

    this.openClientModal(true);
  }

  async deleteClient(id: number): Promise<void> {
    const response = await this.modalConfirmationAlert.confirmOperation();
    if (response) {
      this._clientService.deleteClient(id).subscribe(() => {
        this.getAllClients();
      });
    }
  }

  async saveClient() {
    this.isLoading = true;
    let fileUrl: string = 'assets/jpgs/avatar_placeholder.jpg';
    if (this.hasUploadedFile) {
      const response = await this._uploadFileToCloudStorage();
      if (response.status === 200) {
        fileUrl = response.url;
      }
    }

    const { name, lastName, homeLocation, workLocation } =
      this.clientForm.value;

    const client: Client = {
      homeLocation,
      workLocation,
      totalRides: 0,
      totalFinished: 0,
      name,
      lastName,
      phone: '',
      fileUrl,
    };

    if (this.currentClient) {
      this._clientService
        .updateClient(this.currentClient.id!, client)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((_) => this._doOnSuccess());
    } else {
      this._clientService
        .createClient(client)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((_) => this._doOnSuccess());
    }
  }

  onUploadClientAvatar(file: File) {
    this.clientForm.get('file')!.setValue(file);
  }

  openClientModal(isToUpdate: boolean) {
    this.avatarFileInput.resetPlaceholder();
    if (!isToUpdate) {
      this._resetForm();
    }
    this.isClientModalOpen = true;
  }

  closeClientModal() {
    this.currentClient = null;
    this.isClientModalOpen = false;
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  removeListeners() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  get hasUploadedFile(): boolean {
    const file = this.clientForm.get('file')!.value;
    if (!file) return false;
    return typeof file === 'object';
  }

  get isFormSubmitDisabled(): boolean {
    return this.clientForm.invalid;
  }

  private async _uploadFileToCloudStorage(): Promise<{
    status: number;
    url: string;
  }> {
    try {
      const file: File = this.clientForm.get('file')!.value;
      const response = await this._fileUploadService.uploadFile(file);
      const bodyResponse = await response.json();

      return {
        status: 200,
        url: bodyResponse.url,
      };
    } catch (e) {
      return {
        status: 500,
        url: '',
      };
    }
  }

  private _doOnSuccess(): void {
    this.getAllClients();
    this.closeClientModal();
    this._resetForm();
    this._snackbarService.showSnackbar({
      message: 'Operación exitosa',
      type: 'success',
    });
  }

  private _resetForm(): void {
    this.clientForm.reset('');
    this.currentClient = null;
  }
}
