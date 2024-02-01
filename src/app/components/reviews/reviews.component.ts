import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { ReviewService } from 'src/app/services/review.service';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  currentAlbum: Album | null = null;
  reviews: Review[] = [];
  review: Review = {
    id: '',
    reviewText: '',
    title: '',
    albumId: '',
    userFirstName: '',
    userLastName: '',
    userId: '',
  };

  constructor(
    private albumService: AlbumService,
    private reviewService: ReviewService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentAlbum = this.albumService.getCurrentAlbum();
    if (this.currentAlbum) {
      this.loadReviews(this.currentAlbum.id);
    }
  }

  goToAlbums() {
    this.router.navigate(['/home/albums']);
  }
  submitReview() {
    if (!this.review.reviewText || !this.review.title) {
      console.error('Title and Review Text are required.');
      return;
    }

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      console.error('User not found.');
      return;
    }
    const newAlbum = this.currentAlbum;
    if (!newAlbum) {
      console.error('Album not found.');
      return;
    }
    this.review.albumId = newAlbum.id;
    this.review.userId = currentUser.id;
    const newReview: Review = { ...this.review };
    this.reviewService.submit(newReview).subscribe({
      next: (response) => {
        console.log('Review submitted successfully:', response);
        this.review.title = '';
        this.review.reviewText = '';
        this.loadReviews(newAlbum.id);
      },
      error: (error) => {
        console.error('Error submitting review:', error);
      }
    });
  }

  private loadReviews(albumId: string) {
    this.reviewService.getAllReviews(albumId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

}

