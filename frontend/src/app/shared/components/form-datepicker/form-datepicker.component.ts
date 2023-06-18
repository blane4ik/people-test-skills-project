import { Component } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss']
})
export class FormDatepickerComponent extends BaseInputComponent {

  public handleBlur(): void {
    if (this.control.invalid) {
      this.control.reset();
    }

    this.onBlur.emit()
  }

}

