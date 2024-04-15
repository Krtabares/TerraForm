import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public http: HttpClient, private cookieService: CookieService) { }

  public headers: HttpHeaders;

  public prepareTokenHeader() {


    let item = localStorage.getItem("token_user_access") ? localStorage.getItem("token_user_access") : 'no_token';
    let refreshtoken = localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : 'no_token';
    this.headers = new HttpHeaders()
    .append("authorization", `Bearer ${item}`)
    this.headers = this.headers.append("refreshToken", refreshtoken);
  }

}
