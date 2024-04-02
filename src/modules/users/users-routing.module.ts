import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCrudComponent } from './components/users-crud/users-crud.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [{
  path: '',
  component: UsersListComponent
},
  {
    path: 'new',
    component: UsersCrudComponent
  },
  {
    path: 'update/:uuid',
    component: UsersCrudComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
