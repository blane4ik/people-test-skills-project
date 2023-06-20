import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../components/users/service/users.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../../core/services/modal.service';
import { ModalCloseReason } from '../../../core/components/modal/enum/modal-close-reason.enum';

@Component({
  selector: 'tr[app-editable-table-row]',
  templateUrl: './editable-table-row.component.html',
  styleUrls: [ './editable-table-row.component.scss' ]
})
export class EditableTableRowComponent implements OnInit, OnDestroy {

  @Input()
  public set user(userGroup: FormGroup) {
    this.userGroupInitialValue = userGroup.value;
    this._useGroup = new FormGroup(userGroup.controls);
  }

  public get user(): FormGroup {
    return this._useGroup;
  }

  @Output()
  public removeUser: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('keydown.enter')
  public keydownEnterHandler(): void {
    this.applyChanges();
  }

  public isEditRowMode: boolean = false;

  private _useGroup!: FormGroup;
  private userGroupInitialValue!: any;
  private isAlive$: Subject<void> = new Subject<void>();

  constructor(private userService: UsersService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.handleCancelUserEdit();
  }

  public updateCellValue(value: string, controlName: string): void {
    this.addUserToMap();
    this.userGroupInitialValue[controlName] = value;
  }

  private handleCancelUserEdit(): void {
    this.userService.cancelUserEdit$.pipe(
      takeUntil(this.isAlive$)
    ).subscribe(() => {
      if (this.isEditRowMode) {
        this.cancelEdit();
      }
    })
  }

  private addUserToMap(): void {
    this.userService.updatedUsers.set(this.user.controls['id'].value, this.user.getRawValue());
  }

  public setEditMode(val: boolean): void {
    this.isEditRowMode = val;
  }

  public enterEditMode(): void {
    this.userService.triggerCancelUserEdit();
    this.setEditMode(true);
  }

  public removeUserHandler(id: string): void {
    this.modalService.openRemoveUserConfirmationModal().subscribe((reason: ModalCloseReason) => {
      if (reason === ModalCloseReason.OK) {
        this.removeUser.emit(id);
      }
    })
  }

  public applyChanges(): void {
    if (this.user.valid) {
      this.userGroupInitialValue = this.user.value;
      this.setEditMode(false);
      this.addUserToMap();
      this.userService.triggerUserModified(true);
    }
  }

  public cancelEdit(): void {
    this.user.patchValue(this.userGroupInitialValue);
    this.setEditMode(false);
  }

  ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}
