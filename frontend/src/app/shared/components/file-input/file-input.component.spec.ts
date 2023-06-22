import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';
declare var global: any;
describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetPlaceholder sets the original placeholder of component', () => {
    component.placeholder = 'assets/jpgs/avatar_placeholder.jpg';
    component.resetPlaceholder();
    expect(
      component.imgPlaceholder.nativeElement.src.includes(component.placeholder)
    ).toBeTruthy();
  });

  it('onClickFileUpload calls click of input file', () => {
    jest.spyOn(component.imgPlaceholder.nativeElement, 'click');

    component.onClickFileUpload();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.imgPlaceholder.nativeElement.click).toHaveBeenCalled();
    });
  });

  it('listenToFileUpload sets file src when a file is uploaded', () => {
    global.URL.createObjectURL = jest.fn(() => 'details');
    const mockFile = new File(['contenido'], 'test.jpg', {
      type: 'image/jpeg',
    });
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');

    const emitSpy = jest.spyOn(component.onUploadFile, 'emit');

    inputElement.dispatchEvent(
      new Event('change', { target: { files: [mockFile] } } as any)
    );
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emitSpy).toHaveBeenCalledWith(mockFile);
    });
  });
});
