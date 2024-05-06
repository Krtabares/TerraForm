import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/modules/admin/admin/admin.component';
import { LoginComponent } from 'src/modules/login/components/login/login.component';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { StudentVerificationComponent } from 'src/modules/student-verification/components/student-verification/student-verification.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', loadChildren: () => import('../modules/admin/admin.module').then(m => m.AdminModule) }]
 },
   {
    path: 'singin',
     component: LoginComponent,
    children: [{ path: '', loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule) }]
  },
  {
    path: 'verification/:company/:uuid',
    component: StudentVerificationComponent,
    children: [{ path: '', loadChildren: () => import('../modules/student-verification/student-verification.module').then(m => m.StudentVerificationModule) }]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
