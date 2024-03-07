import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() { }

  setSelectedUser(user: User | null): void {
    this.selectedUserSubject.next(user);
  }

  resetSelectedUser(): void {
    this.setSelectedUser(null);
  }
}
