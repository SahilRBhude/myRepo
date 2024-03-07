import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model'
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  selectedUser:User | null =null;

  constructor(private formBuilder: FormBuilder, private userService: UserService,private dataService:DataService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });

     // Subscribe to the selectedUser$ observable
     this.dataService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
      if (user) {
        // Set form values if a user is selected for editing
        this.userForm.patchValue(user);
      } else {
        // Reset form if no user is selected
        this.userForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userService.addUser(newUser).subscribe(() => {
        console.log('User added successfully!');
        // Set selectedUser to null to notify UserListComponent to refresh the user list
        this.dataService.resetSelectedUser();
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
