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
}
