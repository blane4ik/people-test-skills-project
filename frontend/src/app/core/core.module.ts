import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './components/toasts/toasts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ToastsComponent
  ],
  exports: [
    ToastsComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ]
})
export class CoreModule { }
