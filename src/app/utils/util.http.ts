import { HttpHeaders } from "@angular/common/http";

export class HttpUtil {
  static getAuthorizationHeader(): HttpHeaders {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        return new HttpHeaders({
          "Authorization": token,
          "Content-Type": "application/json",
        });
      }
    } 

    return new HttpHeaders({
      "Authorization": "",
      "Content-Type": "application/json",
    });
  }
}
