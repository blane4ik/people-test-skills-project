import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { ModalCloseReason } from '../components/modal/enum/modal-close-reason.enum';
import { AddNewUserModalComponent } from '../../components/users/components/modals/add-new-user-modal/add-new-user-modal.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { UserUtils } from '../../components/users/utils/user-utils';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  private createModal(component: any, options?: NgbModalOptions): NgbModalRef {
    return this.ngbModal.open(component, {
      ...options,
      backdrop: 'static',
    });
  }

  private openModal(modalRef: NgbModalRef): Observable<ModalCloseReason> {
    return from(modalRef.result);
  }

  public openConfirmationModal(header: string, text: string, cancelText?: string, confirmText?: string): Observable<ModalCloseReason> {
    const modalRef: NgbModalRef = this.createModal(ConfirmationModalComponent);

    modalRef.componentInstance.headerText = header;
    modalRef.componentInstance.text = text;

    if (cancelText) {
      modalRef.componentInstance.cancelText = cancelText;
    }

    if (confirmText) {
      modalRef.componentInstance.confirmText = confirmText;
    }

    return this.openModal(modalRef);
  }

  public openAddNewUserModal(): Observable<ModalCloseReason> {
    const modalRef: NgbModalRef = this.createModal(AddNewUserModalComponent, {
      size: 'lg'
    });

    return this.openModal(modalRef);
  }

  public openUnsavedDataModal(text?: string): Observable<ModalCloseReason> {
    const description: string = text ? text : 'Are you sure you want to proceed? All unsaved data will be lost if you continue.';
    return this.openConfirmationModal('Unsaved data', description, 'Cancel', 'Proceed anyway');
  }

  public openRemoveUserConfirmationModal(): Observable<ModalCloseReason> {
    return this.openConfirmationModal('Remove User', UserUtils.REMOVE_USER__TEXT);
  }
}
