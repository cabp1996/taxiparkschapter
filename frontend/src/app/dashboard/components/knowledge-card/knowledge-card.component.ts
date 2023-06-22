import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../../../shared/interfaces';

@Component({
  selector: 'app-knowledge-card',
  templateUrl: './knowledge-card.component.html',
  styleUrls: ['./knowledge-card.component.scss'],
})
export class KnowledgeCardComponent implements OnInit {
  @Input() skill!: Skill;

  constructor() {}

  ngOnInit(): void {}
}
