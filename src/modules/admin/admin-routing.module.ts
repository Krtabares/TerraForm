import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from '../students/components/students/students.component';
import { PaymentsComponent } from '../payments/components/payments/payments.component';
import { UsersComponent } from '../users/components/users/users.component';
import { ProductComponent } from '../products/components/product/product.component';
import { LevelComponent } from '../level/component/level/level.component';
import { HomeAdminComponent } from '../home-admin/components/home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent
  },
  {
    path: 'students',
    component: StudentsComponent,
    children: [{ path: '', loadChildren: () => import('../students/students.module').then(m => m.StudentsModule) }]
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    children: [{ path: '', loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsModule) }]
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: '', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) }]
  },
  {
    path: 'products',
    component: ProductComponent,
    children: [{ path: '', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) }]
  },
  {
    path: 'levels',
    component: LevelComponent,
    children: [{ path: '', loadChildren: () => import('../level/level.module').then(m => m.LevelModule) }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
