import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`${this.baseUrl}/users`);
  }
}
