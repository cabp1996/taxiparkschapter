import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from '../../services/client.service';
import { of } from 'rxjs';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { FilterClientsPipe } from '../../pipes/filter-clients.pipe';
import { AlertConfirmationComponent } from '../../../shared/components/alert-confirmation/alert-confirmation.component';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientService;
  let fileUploadService: FileUploadService;

  const imgFile: File = new File(['Image'], 'avatar.png', {
    type: 'image/png',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [FilterClientsPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    clientService = TestBed.inject(ClientService);
    fileUploadService = TestBed.inject(FileUploadService);
  });

  beforeEach(() => {
    jest.spyOn(clientService, 'getAllClients').mockReturnValue(
      of([
        {
          id: 1,
          name: '',
          lastName: '',
          phone: '',
          totalRides: 2,
          totalFinished: 2,
          homeLocation: '',
          workLocation: '',
          fileUrl: '',
        },
      ])
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.avatarFileInput = new FileInputComponent();
    jest
      .spyOn(component.avatarFileInput, 'resetPlaceholder')
      .mockImplementation(jest.fn());
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('getAllClients gets client from service', () => {
    component.getAllClients();

    expect(component.clients.length).toBeGreaterThan(0);
  });

  it('call callbacks of rows options when they are clicked', () => {
    const spyStartEdit = jest.spyOn(component, 'startUpdatingClient');
    const spyDelete = jest
      .spyOn(component, 'deleteClient')
      .mockImplementationOnce((id: number) => Promise.resolve(undefined));

    component.getAllClients();

    const firstRowItems = component.clientsTableConfig.rows[0].rowItems;
    const editOption = firstRowItems[firstRowItems.length - 1].actions![0];
    const deleteOption = firstRowItems[firstRowItems.length - 1].actions![1];

    editOption.callback();
    deleteOption.callback();

    expect(spyStartEdit).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalled();
  });

  it('closeClientModal set isModalOpen to false', () => {
    component.closeClientModal();
    expect(component.isClientModalOpen).toBeFalsy();
  });

  it('onSearchTextChange call filter table when the value of search input bar changes', () => {
    const spyFilter = jest.spyOn(component, 'filterTable');
    component.searchText.setValue('Busqueda');
    expect(spyFilter).toHaveBeenCalled();
  });

  it('deleteClient calls get clients when deletion success', async () => {
    const spyGetClients = jest.spyOn(component, 'getAllClients');
    component.modalConfirmationAlert = new AlertConfirmationComponent();
    jest
      .spyOn(component.modalConfirmationAlert, 'confirmOperation')
      .mockResolvedValue(true);
    jest.spyOn(clientService, 'deleteClient').mockReturnValue(of(undefined));
    await component.deleteClient(1);
    expect(spyGetClients).toHaveBeenCalled();
  });

  it('saveClient creates client when theres no current client', async () => {
    const mockClient = {
      file: 'url',
      homeLocation: 'home',
      lastName: 'lastName',
      name: 'name',
      workLocation: 'work',
    };

    jest.spyOn(component, 'hasUploadedFile', 'get').mockReturnValue(true);

    jest.spyOn(fileUploadService, 'uploadFile').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve({ url: 'url' }),
      } as any)
    );

    jest.spyOn(clientService, 'createClient').mockReturnValue(
      of({
        fileUrl: 'url',
        homeLocation: 'home',
        lastName: 'lastName',
        name: 'name',
        totalFinished: 0,
        phone: '123456789',
        totalRides: 5,
        workLocation: 'work',
        id: 1,
      })
    );

    component.clientForm.setValue({ ...mockClient });

    await component.saveClient();

    expect(clientService.createClient).toHaveBeenCalled();
  });

  it('saveClient updates client when theres a current client', async () => {
    try {
      const mockClient = {
        file: 'url',
        homeLocation: 'home',
        lastName: 'lastName',
        name: 'name',
        workLocation: 'work',
      };

      jest.spyOn(component, 'hasUploadedFile', 'get').mockReturnValue(true);

      jest
        .spyOn(fileUploadService, 'uploadFile')
        .mockRejectedValueOnce(new Error());

      jest.spyOn(clientService, 'updateClient').mockReturnValue(
        of({
          fileUrl: 'url',
          homeLocation: 'home',
          lastName: 'lastName',
          name: 'name',
          totalFinished: 0,
          phone: '123456789',
          totalRides: 5,
          workLocation: 'work',
          id: 1,
        })
      );

      component.clientForm.setValue({ ...mockClient });

      component.currentClient = {
        fileUrl: '',
        homeLocation: 'home',
        lastName: 'lastName',
        name: 'name',
        phone: '13456789',
        totalRides: 0,
        totalFinished: 0,
        workLocation: 'work',
        id: 1,
      };

      await component.saveClient();

      expect(clientService.updateClient).toHaveBeenCalled();
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  it('openClientModal resets form when is not for update', () => {
    const spy = jest.spyOn(component.clientForm, 'reset');
    component.openClientModal(false);
    expect(spy).toHaveBeenCalled();
  });

  it('onUploadClientAvatar set file value when its uploaded', () => {
    component.onUploadClientAvatar(imgFile);
    const file = component.clientForm.get('file')!.value;
    expect(file).toBeTruthy();
  });

  it('hasUploaded file returns false if form control has no value', () => {
    component.clientForm.get('file')!.setValue(undefined);
    const result = component.hasUploadedFile;
    expect(result).toBeFalsy();
  });

  it('hasUploaded file returns true if form control has valid file', () => {
    component.clientForm.get('file')!.setValue(imgFile);
    const result = component.hasUploadedFile;
    expect(result).toBeTruthy();
  });
});
