import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserUtils } from '../../../utils/user-utils';
import { UsersService } from '../../../service/users.service';
import { IUser } from '../../../interface/user.interface';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseReason } from '../../../../../core/components/modal/enum/modal-close-reason.enum';

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss']
})
export class AddNewUserModalComponent {
  public formGroup: FormGroup = UserUtils.getUserFormGroup();

  constructor(private usersService: UsersService,
              private toasterService: ToasterService,
              private activeModal: NgbActiveModal) { }

  public save(): void {
    const dto: IUser = this.formGroup.value;

    this.usersService.addUser(dto).subscribe({
      next: () => {
        this.toasterService.showSuccess('User successfully added');
        this.activeModal.close(ModalCloseReason.OK)
      },
      error: () => this.toasterService.showSuccess('Something went wrong...')
    })
  }

}
