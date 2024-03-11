import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { API_URL } from "../constants/backend.constants";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get<any>(`${API_URL}/tasks`).pipe(tap(() => {}));
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/tasks/read-one?id=${id}`).pipe(
      tap((response) => {
        
      })
    );
  }

  createTask(title: string, text: string, status = "TODO"): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/tasks`, { title, text, status })
      .pipe(
        tap((response) => {
         
        })
      );
  }

  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/tasks`, task).pipe(
      tap((response) => {
      
      })
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/tasks?id=${id}`).pipe(
      tap((response) => {
    
      })
    );
  }
}
