import { ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormInputComponent, InputType } from '../form-input/form-input.component';
import { UsersService } from '../../../components/users/service/users.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormDatepickerComponent } from '../form-datepicker/form-datepicker.component';
import { BaseCustomControlComponent } from '../base-custom-control/base-custom-control.component';

export type CellType = 'simple' | 'date';

@Component({
  selector: 'td[app-editable-table-cell]',
  templateUrl: './editable-table-cell.component.html',
  styleUrls: [ './editable-table-cell.component.scss' ]
})
export class EditableTableCellComponent extends BaseCustomControlComponent {
  @Input()
  public value?: string | NgbDateStruct;
  @Input()
  public isRequired: boolean = true;
  @Input()
  public type: InputType = 'text';

  @Input()
  public set isEditRowMode(val: boolean) {
    this.isEditRowModeActivated = val;
    this.setEdit(val);
  }

  @Input()
  public cellType: CellType = 'simple';

  @Output()
  public updateValue: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('input')
  public input!: FormInputComponent | FormDatepickerComponent;

  public isEdit: boolean = false;
  public isEditRowModeActivated: boolean = false;
  private initialValue!: string;

  @HostListener('dblclick')
  public enableEditMode(): void {
    const canBeModified: boolean = this.control.enabled;
    this.setEdit(canBeModified);
    if (!this.isEditRowModeActivated) {
      this.userService.triggerCancelUserEdit();
    }

    setTimeout(() => {
      if (canBeModified) {
        this.input.inputElement.nativeElement.focus();
        this.initialValue = this.control.value;
      }
    })
  }

  @HostListener('keydown.enter')
  public enterKeydownHandler(): void {
    this.applyChanges();
  }

  @HostListener('keydown.escape')
  public escKeydownHandler(): void {
    if (!this.isEditRowModeActivated) {
      this.control.setValue(this.initialValue);
      this.setEdit(false);
      this.cdr.detectChanges();
    }
  }

  @HostBinding('class.active')
  get getIsCellActive() {
    return this.isEdit;
  }

  constructor(ngControl: NgControl,
              private userService: UsersService,
              private parserFormatter: NgbDateParserFormatter,
              private cdr: ChangeDetectorRef) {
    super(ngControl);
  }

  public setEdit(val: boolean): void {
    this.isEdit = val;
  }

  public applyChanges(): void {
    if (!this.isEditRowModeActivated) {
      this.setEdit(false);

      if (this.control.valid && this.initialValue !== this.control.value) {
        this.updateValue.emit(this.control.value);
        this.userService.triggerUserModified(true);
      } else {
        this.control.setValue(this.initialValue);
      }

      this.cdr.detectChanges();
    }
  }

  public getDateString(): string {
    return this.parserFormatter.format(this.value as NgbDateStruct);
  }
}
