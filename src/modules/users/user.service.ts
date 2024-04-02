import { Injectable } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService {

  getUsers() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Users/list`, { headers: this.headers });
  }
  addUser(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Users/new', data, { headers: this.headers });
  }
  getUserByUuid(uuid) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Users/get/` + uuid, { headers: this.headers });
  }
  updUser(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Users/upd', data, { headers: this.headers });
  }
  delUser(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Users/delete', data, { headers: this.headers });
  }
}
