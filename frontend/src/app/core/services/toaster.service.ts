import { Injectable, TemplateRef } from '@angular/core';
import { IToast } from '../interface/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public readonly TOAST_DELAY: number = 5000;

  public toasts: IToast[] = [];

  public showSuccess(msg: string): void {
    this.show(msg, { classname: 'bg-success text-light', delay: 2000, header: 'Success' });
  }

  public showDanger(msg: string): void {
    this.show(msg, { classname: 'bg-danger text-light', delay: 2000, header: 'Error' });
  }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  public remove(toast: IToast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  public defaultErrorHandler = () => this.showDanger('Something went wrong...');
}
