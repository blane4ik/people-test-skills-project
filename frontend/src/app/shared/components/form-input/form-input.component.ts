import { Component, HostListener, Input } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';

export type InputType = 'text' | 'number';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent extends BaseInputComponent {
  @Input()
  type: InputType = 'text';

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (this.type === 'number') {
      const input: HTMLInputElement = event.target as HTMLInputElement;
      const inputValue: string = input.value;

      const onlyNumbers: string = inputValue.replace(/\D/g, '');

      input.value = onlyNumbers.trim();
      this.control.setValue(onlyNumbers);
    }
  }

  public getPlaceholder(): string {
    return this.label ? `Enter ${this.label.toLowerCase()}` : '';
  }
}
