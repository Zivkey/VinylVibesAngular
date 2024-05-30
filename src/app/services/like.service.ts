import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Like } from '../models/like';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl = 'http://localhost:8080/likes';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  create(like: Like): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}`, like, { headers });
  }

  delete(like: Like): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}` + "/delete", like, { headers });
  }

  isLiked(albumId: string, userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}?albumId=${albumId}&userId=${userId}`;
    return this.http.get(url, { headers });
  }
}
