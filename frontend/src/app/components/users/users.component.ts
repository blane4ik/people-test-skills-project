import { Component, OnInit } from '@angular/core';
import { IUser } from './interface/user.interface';
import { UsersService } from './service/users.service';
import { ToasterService } from '../../core/services/toaster.service';
import { ModalService } from '../../core/services/modal.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {

  public users: IUser[] | undefined;
  public formGroup: FormGroup = new FormGroup({
    users: new FormArray([])
  })

  public get usersFormArray(): FormArray {
    return this.formGroup.controls['users'] as FormArray;
  }

  public get userFormGroups(): FormGroup[] {
    return this.usersFormArray.controls as FormGroup[];
  }

  constructor(private usersService: UsersService,
              private toasterService: ToasterService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.getUsers();
  }


  private getUsers(): void {
    this.usersService.getUsers().subscribe((users: IUser[]) => {
      this.usersFormArray.controls = users.map((user: IUser) => this.getUserFormGroup(user));
      this.usersFormArray.valueChanges.subscribe(e => {
        console.log(e)
      })
    })
  }

  private getUserFormGroup(user: IUser): FormGroup {
    return new FormGroup({
      firstName: new FormControl(user.firstName, [ Validators.required ]),
      lastName: new FormControl(user.lastName, [ Validators.required ]),
      streetName: new FormControl(user.streetName, [ Validators.required ]),
      houseNumber: new FormControl(user.houseNumber, [ Validators.required ]),
      apartmentNumber: new FormControl(user.apartmentNumber),
      postalCode: new FormControl(user.postalCode, [ Validators.required ]),
      town: new FormControl(user.town, [ Validators.required ]),
      phoneNumber: new FormControl(user.phoneNumber, [ Validators.required ]),
      dateOfBirth: new FormControl(user.dateOfBirth, [ Validators.required ]),
      age: new FormControl({ value: user.age, disabled: true }, [ Validators.required ]),
    })
  }

  public openAddNewUserModal(): void {
    this.modalService.openAddNewUserModal().subscribe(() => {

    })
  }
}
