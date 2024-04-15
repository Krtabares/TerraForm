import { Injectable } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends GlobalService {

  getPayments() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/payments/list`, { headers: this.headers });
  }
  addPayment(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/payments/new', data, { headers: this.headers });
  }
  getPaymentsByUuid(uuid) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/payments/get/` + uuid, { headers: this.headers });
  }
  updPayment(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/payments/upd', data, { headers: this.headers });
  }
  delPayment(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/payments/delete', data, { headers: this.headers });
  }

  getAnalytics() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/payments/analytics`, { headers: this.headers });
  }

  getResources() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/payments/resources`, { headers: this.headers });
  }
  deleteDiscount(data){
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/payments/deleteDiscount', data, { headers: this.headers });
  }
  getLevelsbyStudents(uuid){
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/registration/LvlByStudent/` + uuid, { headers: this.headers });
  }


}
