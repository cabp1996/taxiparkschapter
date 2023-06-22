import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isModalOpen: boolean = false;
  @Input() hideHeader: boolean = false;
  @Input() idElement: string = 'container-modal';
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'fullscreen' = 'md';
  @Output() onCancel = new EventEmitter<any>();

  close() {
    this.onCancel.emit();
  }

  stopPropagation($event: any) {
    $event.stopPropagation();
  }
}
