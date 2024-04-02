import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsCrudComponent } from './components/students-crud/students-crud.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: 'new',
    component: StudentsCrudComponent
  },
  {
    path: 'update/:uuid',
    component: StudentsCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
