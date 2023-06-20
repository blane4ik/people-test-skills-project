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
  @Input()
  public modified: boolean = false;
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
    this.closeModalHandler(ModalCloseReason.CLOSE);
  }

  onCancel() {
    this.closeModalHandler(ModalCloseReason.CANCEL);
  }

  onConfirm() {
    this.confirm.emit();
  }

  private closeModalHandler(modalCloseReason: ModalCloseReason): void {
    if (this.modified) {
      this.modalService.openUnsavedDataModal().subscribe((reason: ModalCloseReason) => {
        if (reason === ModalCloseReason.OK) {
          this.closeModal(modalCloseReason);
        }
      })
    } else {
      this.closeModal(modalCloseReason);
    }
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
