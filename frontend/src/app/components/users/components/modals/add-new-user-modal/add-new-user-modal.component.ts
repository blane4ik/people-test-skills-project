import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss']
})
export class AddNewUserModalComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      streetName: new FormControl(null, [Validators.required]),
      houseNumber: new FormControl(null, [Validators.required]),
      apartmentNumber: new FormControl(null),
      postalCode: new FormControl(null, [Validators.required]),
      town: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      age: new FormControl({value: null, disabled: true}, [Validators.required]),
    })
  }

  public save(): void {
    console.log(this.formGroup.value)
  }

}
