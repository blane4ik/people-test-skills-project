import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    ToastsComponent,
    ModalComponent
  ],
  exports: [
    ToastsComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ]
})
export class CoreModule { }
