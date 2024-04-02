import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentCrudComponent } from './components/payment-crud/payment-crud.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsListComponent
  },
  {
    path: 'new',
    component: PaymentCrudComponent
  },
  {
    path: 'update/:uuid',
    component: PaymentCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
