import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentVerificationRoutingModule } from './student-verification-routing.module';
import { StudentVerificationComponent } from './components/student-verification/student-verification.component';

import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    StudentVerificationComponent
  ],
  imports: [
    CommonModule,
    StudentVerificationRoutingModule,
    QRCodeModule
  ]
})
export class StudentVerificationModule { }
