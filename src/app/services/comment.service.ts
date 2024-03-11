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
export class CommentService {
  constructor(private http: HttpClient) {}

  getAllComments(taskId:string): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/comments/${taskId}`, { headers })
      .pipe(tap(() => {}));
  }

  getCommentById(id: string): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/comments/read-one?id=${id}`, { headers })
      .pipe(tap(() => {}));
  }

  createComment(text: string, userId: string, taskId: string): Observable<any> {
    return this.http
      .post<any>(`${API_URL}/comments`, { text, userId, taskId }, { headers })
      .pipe(tap(() => {}));
  }

  updateComment(task: any): Observable<any> {
    return this.http
      .put<any>(`${API_URL}/comments`, task, { headers })
      .pipe(tap(() => {}));
  }

  deleteComment(id: string | undefined): Observable<any> {
    return this.http
      .delete<any>(`${API_URL}/comments?id=${id}`, { headers })
      .pipe(tap(() => {}));
  }
}
