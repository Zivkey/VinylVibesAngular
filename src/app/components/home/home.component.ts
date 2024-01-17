import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    console.log(this.user)
  }
}
