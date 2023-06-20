import { Component, TemplateRef } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { IToast } from '../../interface/toast.interface';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200;' },
})
export class ToastsComponent {

  constructor(public toasterService: ToasterService) { }

  public isTemplate(toast: IToast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
