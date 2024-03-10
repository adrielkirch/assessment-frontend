import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../constants/backend.constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/user/login`, { email, password }).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          this.loggedIn.next(true); 
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.loggedIn.next(false); 
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
