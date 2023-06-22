import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeratorService } from '../../services/moderator.service';
import { Moderator } from '../../../shared/interfaces';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss'],
})
export class ModeratorsComponent implements OnInit {
  isModalOpen: boolean = false;
  moderators: Moderator[] = [];
  moderatorsForm!: FormGroup;

  @ViewChild('fileInput') avatarFileInput!: FileInputComponent;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _moderatorService: ModeratorService,
    private readonly _fileUploadService: FileUploadService
  ) {
    this.initalizeForm();
  }

  initalizeForm(): void {
    this.moderatorsForm = this._fb.group({
      file: [null],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getModerators();
  }

  getModerators(): void {
    this._moderatorService.getModerators().subscribe((data) => {
      this.moderators = [...data];
    });
  }

  openModeratorModal(): void {
    this.moderatorsForm.reset('');
    this.isModalOpen = true;
  }

  closeModeratorModal(): void {
    this.avatarFileInput.resetPlaceholder();
    this.isModalOpen = false;
  }

  async saveModerator(): Promise<void> {
    let fileUrl: string = 'assets/svgs/user_placeholder.svg';

    if (this.hasUploadedFile) {
      const response = await this._uploadFileToCloudStorage();
      if (response.status === 200) {
        fileUrl = response.url;
      }
    }

    const { name } = this.moderatorsForm.value;

    const newModerator: Moderator = { name, fileUrl };

    this._moderatorService.createModerator(newModerator).subscribe((_) => {
      this.moderatorsForm.reset('');
      this.closeModeratorModal();
      this.getModerators();
    });
  }

  onUploadModeratorAvatar(file: File) {
    this.moderatorsForm.get('file')!.setValue(file);
  }

  get hasUploadedFile(): boolean {
    const file = this.moderatorsForm.get('file')!.value;
    if (!file) return false;
    return typeof file === 'object';
  }

  get isSubmitButtonDisabled(): boolean {
    return this.moderatorsForm.invalid;
  }

  private async _uploadFileToCloudStorage(): Promise<{
    status: number;
    url: string;
  }> {
    try {
      const file: File = this.moderatorsForm.get('file')!.value;
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
}
