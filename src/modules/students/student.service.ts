import { Injectable } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends GlobalService {

  getStudents() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Students/list`, { headers: this.headers });
  }
  addStudent(data){
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Students/new', data, { headers: this.headers });
  }
  getStudentsByUuid(uuid) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Students/get/`+uuid, { headers: this.headers });
  }
  getStudentsByUuidPublic(uuid,company) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Students/getpublic/` + company + '/' + uuid, { headers: this.headers });
  }
  updStudent(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Students/upd', data, { headers: this.headers });
  }
  delStudent(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Students/delete', data, { headers: this.headers });
  }

  getAnalytics() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Students/analytics`, { headers: this.headers });
  }

  getResources() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Students/resources`, { headers: this.headers });
  }

  registrationLevel(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/registrationStudent', data, { headers: this.headers });
  }
  DeleteRegistrationLevel(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Levels/DeleteRegistrationStudent', data, { headers: this.headers });
  }

}
