import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableTerraComunicationBtnService {

  tableTerraEvent = new EventEmitter<any>();
  modalImageTerraEvent = new EventEmitter<any>();

  constructor() { }

  enviarMensaje(mensaje: any) {
    this.tableTerraEvent.emit(mensaje);
  }

  showImage(src){
    console.log("showImage");

    this.modalImageTerraEvent.emit(src)
  }


}
