import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTableCellComponent } from './components/editable-table-cell/editable-table-cell.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FormInputComponent,
    EditableTableCellComponent
  ],
  exports: [
    FormInputComponent,
    EditableTableCellComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTooltipModule
    ]
})
export class SharedModule { }
