import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public http: HttpClient) { }

  public headers: HttpHeaders;

  public prepareTokenHeader() {

    let item = localStorage.getItem("token_user_access") ? localStorage.getItem("token_user_access") : 'no_token';
    this.headers = new HttpHeaders()
    this.headers = this.headers.set("authorization", `Bearer ${item}`);

  }

}
