import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/modules/shared/services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  permissions: any;
  constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

  login(form) {
    // TODO: Update nameNavigate for default in session storage
    // sessionStorage.setItem('navigate', JSON.stringify({ nameNavigate: 'Dashboard' }));
    // sessionStorage.setItem('navigate2', JSON.stringify({ nameNavigate2: '', isLevel2: false }));

    return this.http.post(environment.routerBase + '/auth/login', form, { withCredentials: true, });
  }

  logOut() {
    this.user = undefined;
    localStorage.clear();
    this.router.navigate(['singin']);
  }

  setUser(user) {
    localStorage.setItem("current_user", JSON.stringify(user));
    this.user = user;
  }

  setPermissions(permission) {
    localStorage.setItem("Permissions", JSON.stringify(permission));
  }

  tokenDecode(token) {
    return this.http.post(environment.routerBase + '/auth/token/decode', { token: token })
  }

  getUser() {
    if (localStorage.getItem("current_user")) {
      this.user = JSON.parse(localStorage.getItem("current_user"));
      return this.user;
    } else {
      return this.user;
    }
  }

  refreshToken() {
    // Realiza una solicitud HTTP para renovar el token
    return this.http.post(environment.routerBase + '/auth/token/decode', {});
  }
}
