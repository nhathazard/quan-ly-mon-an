import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
