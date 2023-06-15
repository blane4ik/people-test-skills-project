import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseReason } from './enum/modal-close-reason.enum';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent {
  @Input()
  public titleLabel!: string;
  @Input()
  public confirmText!: string;
  @Input()
  public confirmButtonEnabled: boolean = true;
  @Input()
  public cancelText!: string;
  @Output()
  public cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public modalClose: EventEmitter<void> = new EventEmitter<void>();


  constructor(public activeModal: NgbActiveModal,
              private modalService: ModalService) {
  }

  onClose(): void {
    this.closeModal(ModalCloseReason.CLOSE);
  }

  onCancel() {
    this.closeModal(ModalCloseReason.CANCEL);
  }

  onConfirm() {
    this.confirm.emit();
  }

  private closeModalHandler(modalCloseReason: ModalCloseReason): void {
    // if (this.modified) {
    //   this.modalService.openUnsavedDataModal(true).subscribe(({ reason }) => {
    //     if (reason === ModalCloseReason.OK) {
    //       this.closeModal(modalCloseReason);
    //     }
    //   })
    // } else {
    //   !this.noNeedForActionCanceled && this.toasterService.showInfo('systemNotifications.info.actionCanceled');
    //   this.closeModal(modalCloseReason);
    // }
  }

  private closeModal(modalCloseReason: ModalCloseReason): void {
    this.activeModal.close(modalCloseReason)

    if (modalCloseReason === ModalCloseReason.CANCEL) {
      this.cancel.emit();
    }

    if (modalCloseReason === ModalCloseReason.CLOSE) {
      this.modalClose.emit();
    }
  }
}
