import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toas: ToastrService) { }

  optionsDefault = { positionClass: "toast-top-right" };

  success(title, msg, option?) {
    console.log("llego ");

    if (option) {
      let newOptions = { ...this.optionsDefault, ...option };
      this.toas.success(msg, title, newOptions);
    } else {
      this.toas.success(msg, title, this.optionsDefault);
    }

  }
  warning(title, msg, option?) {
    if (option) {
      let newOptions = { ...this.optionsDefault, ...option };
      this.toas.warning(msg, title, newOptions);
    } else {
      this.toas.warning(msg, title, this.optionsDefault);
    }
  }
  info(title, msg, option?) {
    if (option) {
      let newOptions = { ...this.optionsDefault, ...option };
      this.toas.info(msg, title, newOptions);
    } else {
      this.toas.info(msg, title, this.optionsDefault);
    }
  }
  error(title, msg, option?) {
    if (option) {
      let newOptions = { ...this.optionsDefault, ...option };
      this.toas.error(msg, title, newOptions);
    } else {
      this.toas.error(msg, title, this.optionsDefault);
    }
  }
  clearToas(Id?) {
    this.toas.clear();
  }


}
