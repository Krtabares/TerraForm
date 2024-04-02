import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableTerraComponent } from './components/table-terra/table-terra.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { WebcamModalComponent } from './components/webcam-modal/webcam-modal.component';
import { CustomImagenViewTableTerraComponent } from './components/custom-imagen-view-table-terra/custom-imagen-view-table-terra.component';
import { ModalViewImageTableTerraComponent } from './components/modal-view-image-table-terra/modal-view-image-table-terra.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TableTerraComponent,
    LoaderComponent,
    WebcamModalComponent,
    CustomImagenViewTableTerraComponent,
    ModalViewImageTableTerraComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule,
    WebcamModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TableTerraComponent,
    LoaderComponent,
    WebcamModalComponent,
    ModalViewImageTableTerraComponent
  ]
})
export class SharedModule { }
