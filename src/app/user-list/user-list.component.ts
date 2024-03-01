import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[]=[];
  filteredUsers: User[]=[];
  filterByName: string ='';
  filterByEmail: string = '';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
   this.fetchUsers();
  }

  fetchUsers():void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers =users;
     });
  }

  applyFilters(): void {
    this.filteredUsers =this.users.filter(user =>
      user.name.toLowerCase().includes(this.filterByName.toLocaleLowerCase()) &&
      user.email.toLowerCase().includes(this.filterByEmail.toLowerCase())
      );
  }
}
