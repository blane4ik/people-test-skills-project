import { Component, Input } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent extends BaseInputComponent {
  @Input()
  public label!: string;
  @Input()
  public isRequired: boolean = true;
  @Input()
  public ignoreValidationErrors: boolean = false;

  public getPlaceholder(): string {
    return this.label ? `Enter ${this.label}` : '';
  }
}
