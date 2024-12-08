import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public token: Observable<string | null> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {

    const savedToken = localStorage.getItem('token');
    this.tokenSubject.next(savedToken);
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
  
  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getAuthHeaders() {
    const token = this.tokenSubject.value;
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }
}

