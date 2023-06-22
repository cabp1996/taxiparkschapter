import { Component, Input, OnInit } from '@angular/core';
import { TopDriver } from '../../../shared/interfaces';

@Component({
  selector: 'app-top-driver',
  templateUrl: './top-driver.component.html',
  styleUrls: ['./top-driver.component.scss'],
})
export class TopDriverComponent implements OnInit {
  @Input() topDriver!: TopDriver;

  constructor() {}

  ngOnInit(): void {}
}
