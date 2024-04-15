import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelCrudComponent } from './component/level-crud/level-crud.component';
import { LevelListComponent } from './component/level-list/level-list.component';

const routes: Routes = [
  {
    path: '',
    component: LevelListComponent
  },
  {
    path: 'new',
    component: LevelCrudComponent
  },
  {
    path: 'update/:uuid',
    component: LevelCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelRoutingModule { }
