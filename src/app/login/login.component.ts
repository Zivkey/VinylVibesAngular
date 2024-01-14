import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  
  constructor(private router: Router) {}

  onLogin() {
    console.log('Login clicked', this.user);
  }
  
}
