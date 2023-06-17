import { Component, ElementRef, EventEmitter, Input, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input()
  public label!: string;
  @Input()
  public isRequired: boolean = true;
  @Input()
  public ignoreValidationErrors: boolean = false;
  @Output()
  public onBlur: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("inputElement")
  public inputElement!: ElementRef;

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

  public getPlaceholder(): string {
    return this.label ? `Enter ${this.label}` : '';
  }
}
