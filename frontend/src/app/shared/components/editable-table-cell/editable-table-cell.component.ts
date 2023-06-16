import { Component, ElementRef, HostListener, Input, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';

@Component({
  selector: 'app-editable-table-cell',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: ['./editable-table-cell.component.scss']
})
export class EditableTableCellComponent implements ControlValueAccessor {
  @Input()
  public value?: string;

  @Input()
  public label!: string;
  @Input()
  public isRequired: boolean = true;

  public isEdit: boolean = false;

  @ViewChild('input')
  public input!: ElementRef;

  @HostListener('dblclick')
  public toggleEdit(): void {
    this.isEdit = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    })
  }

  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  public writeValue(obj: any) {  }

  registerOnChange(fn: any) { }

  registerOnTouched(fn: any) { }

  setDisabledState?(isDisabled: boolean) {
  }

}
