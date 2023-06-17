import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private cancelUserEditSbj: Subject<void> = new Subject<void>();
  public cancelUserEdit$: Observable<void> = this.cancelUserEditSbj.asObservable();

  private readonly baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  public triggerCancelUserEdit(): void {
    this.cancelUserEditSbj.next();
  }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`);
  }
}
