import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  Output,
} from '@angular/core';
import { TableConfig, TableRow } from '../../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements DoCheck {
  @Input() tableConfig!: TableConfig;
  @Input() showTotal: boolean = false;
  @Output() onClickRow = new EventEmitter<TableRow>();
  @Input() totalRowsText: string = 'Total users:';

  readonly MAX_ROWS: number = 5;
  offset: number = 0;
  totalPages: number = 1;
  currentPage: number = 0;

  pageRows: TableRow[] = [];

  iterableDiffer: IterableDiffer<TableRow>;

  constructor(private readonly _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = _iterableDiffers.find([]).create(undefined);
  }

  ngDoCheck(): void {
    let changes = this.iterableDiffer.diff(this.tableConfig.rows);
    if (changes) {
      this.calculatePagesNumber();
      this.setFirstTableRender();
    }
  }

  clickRow(row: TableRow) {
    this.onClickRow.emit(row);
  }

  calculatePagesNumber(): void {
    this.totalPages = Math.ceil(this.tableConfig.rows.length / this.MAX_ROWS);
  }

  setFirstTableRender(): void {
    this.selectPage(0);
  }

  selectPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.offset = this.MAX_ROWS * pageNumber;

    this.pageRows = this.tableConfig.rows.slice(
      this.offset,
      this.offset + this.MAX_ROWS
    );
  }

  navigateNext(): void {
    this.selectPage(this.currentPage + 1);
  }

  navigateBack(): void {
    this.selectPage(this.currentPage - 1);
  }

  get isNextButtonDisabled(): boolean {
    return this.currentPage + 1 === this.totalPages;
  }

  get isBackButtonDisabled(): boolean {
    return this.currentPage === 0;
  }
}
