import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) {}

  submit(review: Review): Observable<any> {
    return this.http.post(`${this.baseUrl}`, review);
  }

  getAllReviews(albumId: String): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + "/" +albumId);
  }
}
