import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = 'http://localhost:8080/albums';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllAlbums(): Observable<Album[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Album[]>(this.baseUrl, { headers });
  }

  create(album: Album): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}`, album, { headers });
  }
 
  setCurrentAlbum(album: Album) {
    localStorage.setItem('currentAlbum', JSON.stringify(album));
  }

  getCurrentAlbum(): Album | null {
    const storedAlbum = localStorage.getItem('currentAlbum');
    return storedAlbum ? JSON.parse(storedAlbum) : null;
  }

  clearCurrentAlbum() {
    localStorage.removeItem('currentAlbum');
  }
}
