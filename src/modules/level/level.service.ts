import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../shared/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService extends GlobalService {

  getLevels() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Levels/list`, { headers: this.headers });
  }
  addLevel(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/new', data, { headers: this.headers });
  }
  getLevelByUuid(uuid) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Levels/get/` + uuid, { headers: this.headers });
  }
  updLevel(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/upd', data, { headers: this.headers });
  }
  delLevel(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/delete', data, { headers: this.headers });
  }
  getResources() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Levels/resources`, { headers: this.headers });
  }
  registrationStudent(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/registrationStudent', data, { headers: this.headers });
  }
  DeleteRegistrationStudent(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/DeleteRegistrationStudent', data, { headers: this.headers });
  }
}
