import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserUtils } from '../../../utils/user-utils';

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
    this.formGroup = UserUtils.getUserFormGroup();
  }

  public save(): void {
    console.log(this.formGroup.value)
  }

}
