import { Component, EventEmitter, HostListener, Input, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { FormInputComponent, InputType } from '../form-input/form-input.component';
import { UsersService } from '../../../components/users/service/users.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormDatepickerComponent } from '../form-datepicker/form-datepicker.component';

export type CellType = 'simple' | 'date';

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
  public type: InputType = 'text';

  @Input()
  public set isEditRowMode(val: boolean) {
    this.isEditRowModeActivated = val;
    this.setEdit(val);
  }

  @Input()
  public cellType: CellType = 'simple';

  @ViewChild('input')
  public input!: FormInputComponent | FormDatepickerComponent;
  @Output()
  public updateValue: EventEmitter<string> = new EventEmitter<string>();

  public isEdit: boolean = false;
  public isEditRowModeActivated: boolean = false;
  private initialValue!: string;


  @HostListener('dblclick')
  public enableEditMode(): void {
    const canBeModified: boolean = this.control.enabled;
    this.setEdit(canBeModified);
    if (!this.isEditRowModeActivated) {
      this.userService.triggerCancelUserEdit();
    }

    setTimeout(() => {
      if (canBeModified) {
        this.input.inputElement.nativeElement.focus();
        this.initialValue = this.control.value;
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
      this.setEdit(false);

      if (this.control.valid && this.initialValue !== this.control.value) {
        this.updateValue.emit(this.control.value);
        this.userService.triggerUserModified(true);
      } else {
        this.control.setValue(this.initialValue);
      }
    }
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
