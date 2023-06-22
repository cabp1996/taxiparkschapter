import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ride } from '../../../shared/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() rides: Ride[] = [];
  @Input() statusFilters: { key: string; total: number }[] = [];
  @Output() onSelectFilter = new EventEmitter<string>();

  selectedFilter: string = 'Pending';

  constructor() {}

  ngOnInit(): void {}

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    this.onSelectFilter.emit(filter);
  }
}
