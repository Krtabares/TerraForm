import { AgPromise, ICellRendererComp } from 'ag-grid-community';
import { ICellRendererParams } from "ag-grid-community";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableTerraComunicationBtnService } from "../../services/table-terra-comunication-btn.service"
@Component({
  standalone: true,
  selector: 'app-custom-btn-table-terra',
  templateUrl: './custom-btn-table-terra.component.html',
  styleUrls: ['./custom-btn-table-terra.component.css']
})
export class CustomBtnTableTerraComponent implements ICellRendererComp {

  constructor(private _comunicacionService: TableTerraComunicationBtnService) { }

  @Input() buttonText: string; // Recibe el parámetro
  @Input() uuid: string; // Recibe el ID
  moduleTerra:string;
  onlyDelete:boolean=false;
  getGui(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  destroy?(): void {
  }
  init?(params: ICellRendererParams<any, any, any>): void | AgPromise<void> {
    // throw new Error('Method not implemented.');
  }
  public params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.buttonText = this.params.buttonText
    this.uuid = this.params.UUID
    this.moduleTerra = this.params.moduleTerra
    this.onlyDelete = this.params.onlyDelete ? this.params.onlyDelete: false
    // console.log(this.params);

   }

  refresh(params: ICellRendererParams) {
    return true;
  }

  btnUpdateClick() {
    // Emitir el evento del botón 1
    this._comunicacionService.enviarMensaje({ action: 'edit', uuid: this.uuid, context: this.moduleTerra });
  }

  btnDeleteClick() {
    // Emitir el evento del botón 2
    this._comunicacionService.enviarMensaje({ action: 'delete', uuid: this.uuid, context: this.moduleTerra });
  }




}



