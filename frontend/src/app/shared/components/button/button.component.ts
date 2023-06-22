import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'button';
  @Input() backgroundColor: string = '#101010';
  @Input() fontColor: string = 'white';
  @Input() isOutline: boolean = false;

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickButton() {
    this.onClick.emit();
  }
}
