import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableRow } from '../../interfaces';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.tableConfig = {
      columns: [],
      rows: [],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clickRow emits click row event', () => {
    const mockRowTable: TableRow = {
      rowItems: [],
      id: '1',
    };
    const spy = jest.spyOn(component.onClickRow, 'emit');
    component.clickRow(mockRowTable);
    expect(spy).toHaveBeenCalled();
  });

  it('navigateNext changes table page to next one', () => {
    const spy = jest.spyOn(component, 'selectPage');
    component.currentPage = 0;
    component.navigateNext();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('navigateBack changes table page to previous one', () => {
    const spy = jest.spyOn(component, 'selectPage');
    component.currentPage = 1;
    component.navigateBack();
    expect(spy).toHaveBeenCalledWith(0);
  });
});
