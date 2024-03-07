import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  editUser(user: User){
    this.userService.updateUser(user).subscribe(users=>{
      this.users;
       user.editing = true;
    })
  }

  saveUser(user:User): void {
    this.userService.updateUser(user).subscribe(() => {
      console.log('User updated successfully!');
      
    });
  }

  addUser(): void {
    
    const newUser: User = {
      id: this.getNextId(),
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      editing: true
    };
    
    this.userService.addUser(newUser).subscribe(addedUser => {
      this.users.push(addedUser); // Add the added user to the end of the array or to add user in begining use unshift method.  
    });
  }

  private getNextId(): number {
    
    return Math.floor(Math.random() * 1000); // Example: Generate a random ID between 1 and 1000
  }
}
