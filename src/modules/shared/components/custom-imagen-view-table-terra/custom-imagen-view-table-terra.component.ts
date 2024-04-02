import { Component, OnInit } from '@angular/core';
import { AgPromise, ICellRendererComp, ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { TableTerraComunicationBtnService } from '../../services/table-terra-comunication-btn.service';

@Component({
  selector: 'app-custom-imagen-view-table-terra',
  templateUrl: './custom-imagen-view-table-terra.component.html',
  styleUrls: ['./custom-imagen-view-table-terra.component.css']
})
export class CustomImagenViewTableTerraComponent implements ICellRendererComp {

  image = ''
  name = ''
  public params: any;
  constructor(private _comunicacionService: TableTerraComunicationBtnService) { }
  getGui(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  destroy?(): void {
    // throw new Error('Method not implemented.');
  }
  init?(params: ICellRendererParams<any, any, any>): void | AgPromise<void> {
    // throw new Error('Method not implemented.');
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.image = environment.routerImg+this.params.image
    this.name =  this.params.name
    // console.log(this.params);

  }

  ngOnInit(): void {
  }

  viewImage(){
    console.log("viewImage");

    this._comunicacionService.showImage( this.image );
  }
}
