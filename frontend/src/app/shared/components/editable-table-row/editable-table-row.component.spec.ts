import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTableRowComponent } from './editable-table-row.component';

describe('EditableTableRowComponent', () => {
  let component: EditableTableRowComponent;
  let fixture: ComponentFixture<EditableTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
