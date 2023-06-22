import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorsComponent } from './moderators.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModeratorService } from '../../services/moderator.service';
import { of } from 'rxjs';
import { FileInputComponent } from '../../../shared/components/file-input/file-input.component';
import { FileUploadService } from '../../../shared/services/file-upload.service';

describe('ModeratorsComponent', () => {
  let component: ModeratorsComponent;
  let fixture: ComponentFixture<ModeratorsComponent>;
  let moderatorService: ModeratorService;
  let fileUploadService: FileUploadService;

  const imgFile: File = new File(['Image'], 'avatar.png', {
    type: 'image/png',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeratorsComponent],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    moderatorService = TestBed.inject(ModeratorService);
    fileUploadService = TestBed.inject(FileUploadService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    component.avatarFileInput = new FileInputComponent();
    jest
      .spyOn(component.avatarFileInput, 'resetPlaceholder')
      .mockImplementation(jest.fn());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getModerators fills moderators data', () => {
    jest.spyOn(moderatorService, 'getModerators').mockReturnValue(
      of([
        {
          id: 1,
          name: 'name',
          fileUrl: 'fileUrl',
        },
      ])
    );

    component.getModerators();

    expect(component.moderators.length).toBeGreaterThan(0);
  });

  it('openModeratorModal opens modal', () => {
    component.openModeratorModal();
    expect(component.isModalOpen).toBeTruthy();
  });

  it('closeModeratorModal closes modal', () => {
    component.closeModeratorModal();
    expect(component.isModalOpen).toBeFalsy();
  });

  it('saveModerator creates moderator', async () => {
    const mockModerator = {
      name: 'name',
    };

    jest.spyOn(component, 'hasUploadedFile', 'get').mockReturnValue(true);

    jest.spyOn(fileUploadService, 'uploadFile').mockResolvedValue(
      Promise.resolve({
        json: () => Promise.resolve({ url: 'url' }),
      } as any)
    );

    jest.spyOn(moderatorService, 'createModerator').mockReturnValue(
      of({
        fileUrl: 'url',
        name: 'name',
        id: 1,
      })
    );

    component.moderatorsForm.patchValue({ ...mockModerator });

    await component.saveModerator();

    expect(moderatorService.createModerator).toHaveBeenCalled();
  });

  it('onUploadModeratorAvatar set file value when its uploaded', () => {
    component.onUploadModeratorAvatar(imgFile);
    const file = component.moderatorsForm.get('file')!.value;
    expect(file).toBeTruthy();
  });

  it('hasUploaded file returns false if form control has no value', () => {
    component.moderatorsForm.get('file')!.setValue(undefined);
    const result = component.hasUploadedFile;
    expect(result).toBeFalsy();
  });

  it('hasUploaded file returns true if form control has valid file', () => {
    component.moderatorsForm.get('file')!.setValue(imgFile);
    const result = component.hasUploadedFile;
    expect(result).toBeTruthy();
  });
});
