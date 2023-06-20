import { Component, Input } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss']
})
export class FormDatepickerComponent extends BaseInputComponent {
  @Input()
  public isInlineEdit: boolean = false;

  public handleBlur(): void {
    if (this.control.invalid && this.isInlineEdit) {
      this.control.reset();
    }

    this.onBlur.emit()
  }

}

