import { TestBed } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';

declare var global: any;

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload a file using FormData', async () => {
    const mockFile = new File(['CONTENIDO'], 'test.jpg', {
      type: 'image/jpeg',
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ url: 'url' }),
      })
    );

    await service.uploadFile(mockFile);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.cloudinary.com/v1_1/${service.CLOUD_NAME}/image/upload`,
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );
  });
});
