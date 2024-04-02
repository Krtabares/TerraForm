import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-webcam-modal',
  templateUrl: './webcam-modal.component.html',
  styleUrls: ['./webcam-modal.component.css']
})
export class WebcamModalComponent implements OnInit {

  @Output() imgReady: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {

      })
      .catch((error) => {
        console.error('Error al obtener permisos:', error);
        this.errorDevice =true
      });



   }

  ngOnInit(): void {
  }

  showModal = false
  toggleModal(){
     this.showModal = !this.showModal
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private trigger: Subject<void> = new Subject<void>();
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public webcamImage: WebcamImage = null;

  handleImage(webcamImage: WebcamImage): void {
    console.log(webcamImage);
    this.webcamImage = webcamImage;

    this.imgReady.emit(webcamImage)
    this.toggleModal()
  }

  errorMessage = ''
  errorDevice = false
  public handleInitError(error: WebcamInitError): void {
    // this.messages.push(error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      alert('Error al acceder a la camara acceso denegado');
      this.errorMessage = " Error al acceder a la camara"
      this.errorDevice = true
      try {
        const stream =  navigator.mediaDevices.getUserMedia({ video: true });
        // Mostrar la vista previa de la cámara o realizar otras acciones aquí
      } catch (error) {
        console.error('Error al solicitar permisos de la cámara:', error);
        // Manejar el caso en que el usuario deniega los permisos
      }
    }
  }


}
