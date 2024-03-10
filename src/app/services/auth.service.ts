import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { API_URL } from "../constants/backend.constants";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedIn = false

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/users/login`, { email, password })
      .pipe(
        tap((response) => {
          const session = response;
          localStorage.setItem("token", session.token);
          
          delete session["token"];

          localStorage.setItem("session", JSON.stringify(session));
          this.loggedIn = true;
        })
      );
  }

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/users/signup`, { email, password })
      .pipe(
        tap(() => {
       
        })
      );
  }


  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("token");
    } else {
      return false;
    }
  }
}
