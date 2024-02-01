import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  updateMessage = '';
  errorMessage = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.user.password = '';
    }
  }

  updateProfile() {
    this.errorMessage = '';
    this.updateMessage = '';

    if (this.user && this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
    } else if (this.user) {
      this.userService.updateUserProfile(this.user).subscribe({
        next: (response) => {
          this.userService.setCurrentUser(response);
          this.updateMessage = 'Profile updated successfully.';
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      });
    }
  }
}
