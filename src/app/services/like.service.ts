import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Like } from '../models/like';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseUrl = 'http://localhost:8080/likes';

  constructor(private http: HttpClient) {}

  create(like: Like): Observable<any> {
    return this.http.post(`${this.baseUrl}`, like);
  }

  delete(like: Like): Observable<any> {
    return this.http.post(`${this.baseUrl}` + "/delete", like);
  }

  isLiked(albumId: string, userId: string): Observable<any> {
    const url = `${this.baseUrl}?albumId=${albumId}&userId=${userId}`;
    return this.http.get(url);
  }
}
