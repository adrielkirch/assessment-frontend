import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from localStorage, providing a default value of an empty string if not found
    const token: string = localStorage.getItem("token") || '';
    
    // Alert token (for debugging purposes)
    alert(token);

    // If no token is found, throw an error
    if (!token) {
      return throwError(() => new Error("No authentication token found."));
    }

    // Clone the request and set the Authorization header with the token
    request = request.clone({
      setHeaders: { Authorization: token },
    });

    // Continue with the modified request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }
}
