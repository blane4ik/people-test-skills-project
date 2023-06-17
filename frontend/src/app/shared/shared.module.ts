import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTableCellComponent } from './components/editable-table-cell/editable-table-cell.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditableTableRowComponent } from './components/editable-table-row/editable-table-row.component';



@NgModule({
  declarations: [
    FormInputComponent,
    EditableTableCellComponent,
    EditableTableRowComponent
  ],
  exports: [
    FormInputComponent,
    EditableTableCellComponent,
    EditableTableRowComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        NgbDropdownModule
    ]
})
export class SharedModule { }
