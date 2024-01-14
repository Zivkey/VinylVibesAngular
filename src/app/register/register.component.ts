import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onRegister() {
    // Validate registration data
    if (this.isValidRegistration()) {
      // Perform registration logic here
      console.log('Registration data:', this.user);

      // After successful registration, navigate to another page (if needed)
      this.router.navigate(['/dashboard']);
    } else {
      // Display error message or handle validation errors
      console.error('Invalid registration data');
    }
  }

  private isValidRegistration(): boolean {
    // Add your validation logic here
    // For example, check if required fields are filled, if passwords match, etc.
    // Return true if registration data is valid, false otherwise
    return (
      this.user.firstName.trim() !== '' &&
      this.user.lastName.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.password.trim() !== '' &&
      this.user.password === this.user.confirmPassword
    );
  }
}