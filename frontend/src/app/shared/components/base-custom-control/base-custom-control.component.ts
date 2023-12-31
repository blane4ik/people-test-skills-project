import { Component, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-base-custom-control',
  template: ''
})
export class BaseCustomControlComponent implements ControlValueAccessor {
  public get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

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
