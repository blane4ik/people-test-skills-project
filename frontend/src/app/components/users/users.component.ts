import { Component, OnInit } from '@angular/core';
import { IUser } from './interface/user.interface';
import { UsersService } from './service/users.service';
import { ToasterService } from '../../core/services/toaster.service';
import { ModalService } from '../../core/services/modal.service';
import { FormArray, FormGroup } from '@angular/forms';
import { UserUtils } from './utils/user-utils';
import { ModalCloseReason } from '../../core/components/modal/enum/modal-close-reason.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    users: new FormArray([])
  })

  public get usersFormArray(): FormArray {
    return this.formGroup.controls['users'] as FormArray;
  }

  public get userFormGroups(): FormGroup[] {
    return this.usersFormArray.controls as FormGroup[];
  }

  private initialUsersValue: IUser[] = [];

  constructor(public usersService: UsersService,
              private toasterService: ToasterService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.getUsers();
  }


  private getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users: IUser[]) => {
        this.initialUsersValue = users;
        this.updateFormArrayControls(users);
      },
      error: () => this.toasterService.showDanger('Something went wrong...')
    })
  }

  private updateFormArrayControls(users: IUser[]): void {
    this.usersFormArray.controls = UserUtils.getFormArrayControlsFromUsers(users);
  }

  public removeUser(id: string) {
    this.usersService.removeUser(id).subscribe({
      next: () => {
        this.toasterService.showSuccess('User successfully removed');
        this.getUsers();
      },
      error: () => this.toasterService.showSuccess('Something went wrong...')
    })
  }

  public cancelChanges(): void {
    this.modalService.openUnsavedDataModal(UserUtils.USER_UPDATE_CANCEL_TEXT).subscribe((reason: ModalCloseReason) => {
      if (reason === ModalCloseReason.OK) {
        this.updateFormArrayControls(this.initialUsersValue);
        this.usersService.triggerUserModified(false);
      }
    })
  }

  public openAddNewUserModal(): void {
    this.modalService.openAddNewUserModal().subscribe((reason: ModalCloseReason) => {
      if (reason === ModalCloseReason.OK) {
        this.getUsers();
      }
    })
  }

  public save(): void {
    this.usersService.triggerCancelUserEdit();
    const updatedUsers: IUser[] = Array.from(this.usersService.updatedUsers.values()).map((group: FormGroup) => group.getRawValue());

    this.usersService.saveUpdatedUsers(updatedUsers).subscribe({
      next: () => {
        this.toasterService.showSuccess('Successfully saved');
        this.usersService.updatedUsers.clear();
        this.usersService.triggerUserModified(false);
        this.getUsers();
      },
      error: () => this.toasterService.showSuccess('Something went wrong...')
    })
  }
}
