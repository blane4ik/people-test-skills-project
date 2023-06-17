import { Component, HostListener, Input, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'td[app-editable-table-cell]',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: [ './editable-table-cell.component.scss' ]
})
export class EditableTableCellComponent implements ControlValueAccessor {
  @Input()
  public value?: string;
  @Input()
  public label!: string;
  @Input()
  public isRequired: boolean = true;
  @Input()
  public set isEditRowMode(val: boolean) {
    this.isEditRowModeActivated = val;
    this.setEdit(val);
  }

  public isEdit: boolean = false;
  public isEditRowModeActivated: boolean = false;

  @ViewChild('input')
  public input!: FormInputComponent;

  @HostListener('dblclick')
  public enableEditMode(): void {
    const canBeModified: boolean = this.control.enabled;
    this.setEdit(canBeModified);
    setTimeout(() => {
      if (canBeModified) {
        this.input.inputElement.nativeElement.focus();
      }
    })
  }

  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  public setEdit(val: boolean): void {
    this.isEdit = val;
  }

  public handleInputBlur(): void {
    if (!this.isEditRowModeActivated) {
      this.setEdit(false)
    }
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
