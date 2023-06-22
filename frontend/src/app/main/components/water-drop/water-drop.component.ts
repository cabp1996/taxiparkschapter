import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-water-drop',
  templateUrl: './water-drop.component.html',
  styleUrls: ['./water-drop.component.scss'],
})
export class WaterDropComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() footer: string = '';
}
