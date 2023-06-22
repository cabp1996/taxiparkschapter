import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  readonly CLOUD_NAME: string = environment.cloudStorage.cloudName;
  readonly UPLOAD_PRESET: string = environment.cloudStorage.uploadPreset;

  constructor() {}

  uploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

    return fetch(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
  }
}
