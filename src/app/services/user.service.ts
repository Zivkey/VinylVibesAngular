import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  setCurrentUser(user: User, token: string) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (token !== '') {
      localStorage.setItem('token', token);
    }
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/public/register`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/public/login`, user).pipe(
      tap(response => {
        this.setCurrentUser(response.user, response.token);
      })
    );
  }

  updateUserProfile(user: User): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/update`, user, {headers});
  }
}
