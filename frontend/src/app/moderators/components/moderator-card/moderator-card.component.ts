import { Component, Input, OnInit } from '@angular/core';
import { Moderator } from '../../../shared/interfaces';

@Component({
  selector: 'app-moderator-card',
  templateUrl: './moderator-card.component.html',
  styleUrls: ['./moderator-card.component.scss'],
})
export class ModeratorCardComponent implements OnInit {
  @Input() moderator!: Moderator;
  @Input() placeholder: string = 'assets/svgs/user_placeholder.svg';

  constructor() {}

  ngOnInit(): void {}
}
