import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutComunicationService {

  ToggleMenuEvent = new EventEmitter<any>();

  constructor() { }

  toggleMenu() {
    console.log("toggleMenu");
    this.ToggleMenuEvent.emit({})
  }
}
