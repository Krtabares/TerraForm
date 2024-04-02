import { Component, OnInit } from '@angular/core';
import { TableTerraComunicationBtnService } from '../../services/table-terra-comunication-btn.service';

@Component({
  selector: 'app-modal-view-image-table-terra',
  templateUrl: './modal-view-image-table-terra.component.html',
  styleUrls: ['./modal-view-image-table-terra.component.css']
})
export class ModalViewImageTableTerraComponent implements OnInit {
  image

  constructor(private _comunicacionService: TableTerraComunicationBtnService) {
    this._comunicacionService.modalImageTerraEvent.subscribe((action) => {

      this.handleEvent(action)
    });
  }

  ngOnInit(): void {
  }

  handleEvent(src){

    this.toggleModal()
    this.image = src
  }

  showModal = false
  toggleModal() {
    this.showModal = !this.showModal
  }


}
