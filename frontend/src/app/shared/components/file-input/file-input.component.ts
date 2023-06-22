import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit, AfterViewInit {
  @Input() idElement: string = '';
  @Input() placeholder: string = 'assets/jpgs/avatar_placeholder.jpg';

  @Output() onUploadFile = new EventEmitter<File>();

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('imgPlaceholder') imgPlaceholder!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.listenToFileUpload();
  }

  listenToFileUpload(): void {
    const input: HTMLInputElement = this.fileInput.nativeElement;
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const img: HTMLImageElement = this.imgPlaceholder.nativeElement;
      img.src = URL.createObjectURL(file);

      this.onUploadFile.emit(file);
    };
  }

  onClickFileUpload(): void {
    const input: HTMLInputElement = this.fileInput.nativeElement;
    input.click();
  }

  resetPlaceholder(): void {
    const img: HTMLImageElement = this.imgPlaceholder.nativeElement;
    img.src = this.placeholder;
  }
}
