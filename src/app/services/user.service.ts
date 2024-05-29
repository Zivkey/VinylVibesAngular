import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/public/register`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  updateUserProfile(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }
}
