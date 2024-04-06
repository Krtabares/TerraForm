import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ColDef, GridApi, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community'; // Column Definition Type Interface
import { localeEs } from 'src/config/locale.es';
import { CustomBtnTableTerraComponent } from '../custom-btn-table-terra/custom-btn-table-terra.component';
import { TableTerraComunicationBtnService } from '../../services/table-terra-comunication-btn.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomImagenViewTableTerraComponent } from '../custom-imagen-view-table-terra/custom-imagen-view-table-terra.component';


@Component({
  selector: 'app-table-terra',
  templateUrl: './table-terra.component.html',
  styleUrls: ['./table-terra.component.css']
})
export class TableTerraComponent implements OnInit {

  @Input() rowData: any = [];
  @Input() idTable:number = null
  @Output() deleteRow: EventEmitter<any> = new EventEmitter<any>();
  colDefs: ColDef[] = []
  private gridApi!: GridApi<any>;
  public localeText: {
    [key: string]: string;
  } = localeEs;

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    minWidth: 150,
  };
  public autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = {
      type: "fitGridWidth",
      defaultMinWidth: 100,
      columnLimits: [
        {
          colId: "country",
          minWidth: 900,
        },
      ],
    };

  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];

  constructor(private _comunicacionService: TableTerraComunicationBtnService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this._comunicacionService.tableTerraEvent.subscribe((action) => {
      this.handleButtonClick(action)
    });
  }

  ngOnInit(): void {
    this.colDefs = this.coldefArrays[this.idTable]
    // this.sizeToFit()
  }

  image = ''
  handleButtonClick(obj) {
    // console.log(action);
    // Realiza acciones específicas para el botón 10
    if(obj.action == 'edit'){
      this.router.navigate(["admin/"+obj.context+"/update/"+obj.uuid]);
    }

    if (obj.action == 'delete') {
      this.deleteRow.emit({ uuid: obj.uuid })
    }

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
      columnLimits: [{ key: "country", minWidth: 900 }],
    });
  }



  coldefArrays = {
    1: [
        {
          headerName: "Acciones",
          cellRenderer: CustomBtnTableTerraComponent,
          cellRendererParams: (params) => ({
            moduleTerra: 'students',
            UUID: params.data.UUID
          }),
        floatingFilter: false,
        filter: false,
        resizable: false,
        maxWidth: 130

        },
      {
        field: "Name",
        headerName: "Nombre",
        cellRenderer: CustomImagenViewTableTerraComponent,
        cellRendererParams: (params) => ({
          image: params.data.Image,
          name: params.data.Name
        }),
      },
        { field: "CI" },
        { field: "Birthdate", headerName: "Fecha de Cumpleaños" },
        { field: "Gender", headerName: "Genero" },
        {
          field: "Status", headerName: "Estado",
          cellRenderer: p => {
            return (p.value == 1) ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-warning">Inactivo</span>'
          }
        }

      ],
    2:[
      {
        headerName: "Acciones",
        cellRenderer: CustomBtnTableTerraComponent,
        cellRendererParams: (params) => ({
          moduleTerra: 'payments',
          UUID: params.data.UUID
        }),
        floatingFilter: false,
        filter: false,
        resizable: false,
        maxWidth: 130

      },
      { field: "Amount", headerName: "Monto" },
      { field: "Description", headerName: "Descripcion" },
      { field: "Name", headerName: "nombre" },
      { field: "PaymentDate", headerName: "Fecha" },
      {
        field: "Status", headerName: "Estado",
        filter: false,
        valueFormatter: (p)=>{return p.value == 1? 'Pendiente': 'Completado' },
        filterParams: {
          valueFormatter: (p) => { return p.value == 1 ? 'Pendiente' : 'Completado' },
        },
        cellRenderer: p => {
          return (p.value == 1) ? '<span class="badge badge-warning">pendiente</span>' : '<span class="badge badge-success">completado</span>'
        }
      }
    ],
    3: [
      {
        headerName: "Acciones",
        cellRenderer: CustomBtnTableTerraComponent,
        cellRendererParams: (params) => ({
          moduleTerra: 'products',
          UUID: params.data.UUID
        }),
        floatingFilter: false,
        filter: false,
        resizable: false,
        maxWidth: 130

      },
      {
        field: "Name",
        headerName: "Nombre"
      },
      { field: "Amount", headerName: "Monto" },
      // { field: "Gender", headerName: "Genero" },
      {
        field: "Status", headerName: "Estado",
        cellRenderer: p => {
          return (p.value == 1) ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-warning">Inactivo</span>'
        }
      }

    ],
  }

}
