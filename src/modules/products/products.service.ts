import { Injectable } from '@angular/core';
import { GlobalService } from '../shared/services/global.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends GlobalService {

  getProducts() {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Products/list`, { headers: this.headers });
  }
  addProduct(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Products/new', data, { headers: this.headers });
  }
  getProductByUuid(uuid) {
    this.prepareTokenHeader();
    return this.http.get(environment.routerBase + `/Products/get/` + uuid, { headers: this.headers });
  }
  updProduct(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Products/upd', data, { headers: this.headers });
  }
  delProduct(data) {
    this.prepareTokenHeader();
    return this.http.post(environment.routerBase + '/Products/delete', data, { headers: this.headers });
  }
}
