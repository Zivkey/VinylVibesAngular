import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    id: '',
    admin: false,
    createdAt: '',
    updatedAt: ''
  };

  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onRegister() {
    
    if (this.isValidRegistration()) {
      console.log('Registration data:', this.user);
      const newUser: User = { ...this.user };
      this.userService.register(newUser).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/dashboard']);
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