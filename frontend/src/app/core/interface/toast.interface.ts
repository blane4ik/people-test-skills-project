import { TemplateRef } from '@angular/core';

export interface IToast {
  textOrTpl: TemplateRef<any> | null;
  classname?: string;
  header: string;
}
