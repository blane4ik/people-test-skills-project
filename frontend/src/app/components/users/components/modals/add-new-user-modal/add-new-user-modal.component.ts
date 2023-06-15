import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    })
  }

  public save(): void {

  }

}
