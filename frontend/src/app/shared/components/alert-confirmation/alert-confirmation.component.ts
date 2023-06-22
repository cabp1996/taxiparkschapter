import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-confirmation',
  templateUrl: './alert-confirmation.component.html',
  styleUrls: ['./alert-confirmation.component.scss'],
})
export class AlertConfirmationComponent implements OnInit {
  @Input() message: string = '';

  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  closeAlertModal(): void {
    this.isOpen = false;
  }

  confirmOperation(): Promise<boolean> {
    this.isOpen = true;
    return new Promise<boolean>((resolve) => {
      const cancelButton: HTMLButtonElement =
        document.querySelector('.button--cancel')!;
      const confirmButton: HTMLButtonElement =
        document.querySelector('.button--accept')!;

      confirmButton.onclick = () => {
        this.isOpen = false;
        resolve(true);
      };

      cancelButton.onclick = () => {
        this.isOpen = false;
        resolve(false);
      };
    });
  }
}
