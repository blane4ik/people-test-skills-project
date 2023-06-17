import { Component, ElementRef, EventEmitter, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class BaseInputComponent implements ControlValueAccessor {
  @Output()
  public onBlur: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("inputElement", { read: ElementRef })
  public inputElement!: ElementRef;

  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  public value: any;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }


  writeValue(obj: any) {  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  setDisabledState?(isDisabled: boolean) {
  }

  onChange: (value: any) => void = () => {};
}
