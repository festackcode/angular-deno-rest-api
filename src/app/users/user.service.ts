import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient: HttpClient
  apiURL = "/api/v1/";

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  usersAction = {
    getUsers: (): Observable<any> => {
      return this.httpClient.get(this.apiURL+'users');
    },
    getUser: (id:string): Observable<any> => {
      return this.httpClient.get(this.apiURL+'users' + '/' + id);
    },
    addUser: (user: Users): Observable<any> => {
      return this.httpClient.post(this.apiURL+'users', user);
    },
    updateUser: (id:string, user: Users): Observable<any> => {
      return this.httpClient.put(this.apiURL+'users' + '/' + id, user);
    },
    deleteUser: (id:string): Observable<any> => {
      return this.httpClient.delete(this.apiURL+'users' + '/' + id);
    }
    
  }

}
