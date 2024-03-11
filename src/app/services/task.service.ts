import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { API_URL } from "../constants/backend.constants";
import { HttpUtil } from "../utils/util.http";

const headers = HttpUtil.getAuthorizationHeader();

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/tasks`, { headers })
      .pipe(tap(() => {}));
  }

  getTaskById(id: string): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/tasks/read-one?id=${id}`, { headers })
      .pipe(tap(() => {}));
  }

  createTask(title: string, text: string, status = "TODO"): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/tasks`, { title, text, status }, { headers })
      .pipe(tap(() => {}));
  }

  updateTask(task: any): Observable<any> {
    return this.http
      .put<any>(`${API_URL}/tasks`, task, { headers })
      .pipe(tap(() => {}));
  }

  deleteTask(id: string): Observable<any> {
    return this.http
      .delete<any>(`${API_URL}/tasks?id=${id}`, { headers })
      .pipe(tap(() => {}));
  }
}
