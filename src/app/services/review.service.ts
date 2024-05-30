import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  submit(review: Review): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}`, review, { headers });
  }

  getAllReviews(albumId: String): Observable<Review[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Review[]>(`${this.baseUrl}/${albumId}`, { headers });
  }
}
