import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser } from '../interface/user.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private cancelUserEditSbj: Subject<void> = new Subject<void>();
  public cancelUserEdit$: Observable<void> = this.cancelUserEditSbj.asObservable();
  private isModifiedSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isModified$: Observable<boolean> = this.isModifiedSbj.asObservable();
  public updatedUsers: Set<FormGroup> = new Set<FormGroup>();

  private readonly baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  public triggerCancelUserEdit(): void {
    this.cancelUserEditSbj.next();
  }

  public triggerUserModified(val: boolean): void {
    this.isModifiedSbj.next(val);
  }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`);
  }

  public addUser(dto: IUser): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/user`, dto);
  }

  public removeUser(id: string): Observable<string> {
    const params: HttpParams = new HttpParams().append('id', id);

    return this.httpClient.delete<string>(`${this.baseUrl}/user`, { params });
  }

  public saveUpdatedUsers(users: IUser[]): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/users`, users);
  }
}
