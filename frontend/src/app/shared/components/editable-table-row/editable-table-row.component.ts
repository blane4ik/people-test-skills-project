import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../components/users/service/users.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'tr[app-editable-table-row]',
  templateUrl: './editable-table-row.component.html',
  styleUrls: ['./editable-table-row.component.scss']
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

  public isEditRowMode: boolean = false;

  private _useGroup!: FormGroup;
  private userGroupInitialValue!: any;

  private isAlive$: Subject<void> = new Subject<void>();
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.cancelUserEdit$.pipe(
      takeUntil(this.isAlive$)
    ).subscribe(() => {
      this.cancelEdit();
    })
  }

  public setEditMode(val: boolean): void {
    this.isEditRowMode = val;
  }

  public enterEditMode(): void {
    this.userService.triggerCancelUserEdit();
    this.setEditMode(true);
  }

  public removeUser(): void {
    this.user.patchValue(this.userGroupInitialValue);
  }

  public applyChanges(): void {
    this.userGroupInitialValue = this.user.value;
    this.setEditMode(false);
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
