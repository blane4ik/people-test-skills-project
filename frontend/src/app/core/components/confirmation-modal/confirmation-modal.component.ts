import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseReason } from '../modal/enum/modal-close-reason.enum';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input()
  public headerText!: string;
  @Input()
  public text!: string;
  @Input()
  public cancelText: string = 'No';
  @Input()
  public confirmText: string = 'Yes';

  constructor(private activeModal: NgbActiveModal) { }

  public confirm(): void {
    this.activeModal.close(ModalCloseReason.OK);
  }
}
