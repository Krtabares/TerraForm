import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentCrudComponent } from './components/payment-crud/payment-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,
    PaymentCrudComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaymentsModule { }
