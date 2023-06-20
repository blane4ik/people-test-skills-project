import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseCustomControlComponent } from '../base-custom-control/base-custom-control.component';

@Component({
  selector: 'app-base-input',
  template: ''
})
export class BaseInputComponent extends BaseCustomControlComponent {
  @Input()
  public label?: string;
  @Input()
  public isRequired: boolean = true;
  @Input()
  public ignoreValidationErrors: boolean = false;
  @Output()
  public onBlur: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("inputElement", { read: ElementRef })
  public inputElement!: ElementRef;
}
