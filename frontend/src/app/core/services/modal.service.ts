import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { ModalCloseReason } from '../components/modal/enum/modal-close-reason.enum';
import { AddNewUserModalComponent } from '../../components/users/components/modals/add-new-user-modal/add-new-user-modal.component';

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

  public openAddNewUserModal(): Observable<ModalCloseReason> {
    const modalRef: NgbModalRef = this.createModal(AddNewUserModalComponent, {
      size: 'lg'
    });

    return this.openModal(modalRef);
  }
}
