import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = new User('', '', '', '', '', false, ''); 
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  onLogin() {
    this.errorMessage = null;
  
    this.userService.login(this.user).subscribe({
    next: (loggedInUser) => {
        console.log('Login successful');
        this.userService.setCurrentUser(loggedInUser, loggedInUser.jwt);
        this.router.navigate(['/home']);
      },
     error: (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'Password or email is not correct.';
      }
  });
  }
}