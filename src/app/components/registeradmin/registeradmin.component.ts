import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.scss']
})
export class RegisteradminComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    id: '',
    admin: false,
  };

  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: String = '';

  constructor(private router: Router, private userService: UserService) {}

  onRegister() {
    
    if (this.isValidRegistration()) {
      this.successMessage = "";
      this.errorMessage = "";
      console.log('Registration data:', this.user);
      const newUser: User = { ...this.user };
      this.userService.register(newUser).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.successMessage = "User created successfully";
          this.user.email = '';
          this.user.admin = false;
          this.user.firstName = '';
          this.user.lastName = '';
          this.user.lastName = '';
          this.user.password = '';
          this.confirmPassword = '';

        },
        (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error;
        }
      );
    } else {
      console.error('Invalid registration data');
    }
  }


  private isValidRegistration(): boolean {
    return (
      this.user.firstName.trim() !== '' &&
      this.user.lastName.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.password == this.confirmPassword
    );
  }
}
