import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='https://jsonplaceholder.typicode.com/users';
  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
