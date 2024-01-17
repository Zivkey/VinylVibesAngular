import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = 'http://localhost:8080/albums';

  constructor(private http: HttpClient) {}

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl);
  }

  create(album: Album): Observable<any> {
    return this.http.post(`${this.baseUrl}`, album);
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
