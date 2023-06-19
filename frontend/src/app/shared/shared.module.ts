import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTableCellComponent } from './components/editable-table-cell/editable-table-cell.component';
import { NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditableTableRowComponent } from './components/editable-table-row/editable-table-row.component';
import { FormDatepickerComponent } from './components/form-datepicker/form-datepicker.component';
import { BaseInputComponent } from './components/base-input/base-input.component';
import { BaseCustomControlComponent } from './components/base-custom-control/base-custom-control.component';


@NgModule({
  declarations: [
    FormInputComponent,
    EditableTableCellComponent,
    EditableTableRowComponent,
    FormDatepickerComponent,
    BaseInputComponent,
    BaseCustomControlComponent,
  ],
    exports: [
        FormInputComponent,
        EditableTableCellComponent,
        EditableTableRowComponent,
        FormDatepickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTooltipModule,
        NgbDropdownModule,
        NgbDatepickerModule
    ]
})
export class SharedModule { }
