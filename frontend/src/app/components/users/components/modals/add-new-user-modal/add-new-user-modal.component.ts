import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserUtils } from '../../../utils/user-utils';
import { UsersService } from '../../../service/users.service';

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss']
})
export class AddNewUserModalComponent {
  public formGroup: FormGroup = UserUtils.getUserFormGroup();

  constructor(private usersService: UsersService) { }

  public save(): void {
    console.log(this.formGroup.value)
  }

}
