import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import {  httpInterceptorProviders } from '../shared/helpers/terra-interceptor.interceptor';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  // providers: [httpInterceptorProviders],
})
export class AdminModule { }
