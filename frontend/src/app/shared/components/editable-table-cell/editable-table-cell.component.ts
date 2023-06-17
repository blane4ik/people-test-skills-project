import { Component, HostListener, Input, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { UsersService } from '../../../components/users/service/users.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormDatepickerComponent } from '../form-datepicker/form-datepicker.component';

export type CellType = 'simple' | 'phone' | 'date';

@Component({
  selector: 'td[app-editable-table-cell]',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: [ './editable-table-cell.component.scss' ]
})
export class EditableTableCellComponent implements ControlValueAccessor {
  @Input()
  public value?: string | NgbDateStruct;
  @Input()
  public label!: string;
  @Input()
  public isRequired: boolean = true;

  @Input()
  public set isEditRowMode(val: boolean) {
    this.isEditRowModeActivated = val;
    this.setEdit(val);
  }

  @Input()
  public cellType: CellType = 'simple';

  @ViewChild('input')
  public input!: FormInputComponent | FormDatepickerComponent;

  public isEdit: boolean = false;
  public isEditRowModeActivated: boolean = false;


  @HostListener('dblclick')
  public enableEditMode(): void {
    const canBeModified: boolean = this.control.enabled;
    this.setEdit(canBeModified);
    if (!this.isEditRowModeActivated) {
      this.userService.triggerCancelUserEdit();
    }

    setTimeout(() => {
      if (canBeModified) {
        console.log(this.input)
        this.input.inputElement.nativeElement.focus();
      }
    })
  }

  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor(@Self() public ngControl: NgControl,
              private userService: UsersService,
              private parserFormatter: NgbDateParserFormatter) {
    this.ngControl.valueAccessor = this;
  }

  public setEdit(val: boolean): void {
    this.isEdit = val;
  }

  public handleInputBlur(): void {
    if (!this.isEditRowModeActivated) {
      this.setEdit(false)
    }
    console.log(2323)
  }

  public getDateString(): string {
    return this.parserFormatter.format(this.value as NgbDateStruct);
  }

  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState?(isDisabled: boolean) {
  }

}
