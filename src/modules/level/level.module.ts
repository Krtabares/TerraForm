import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelComponent } from './component/level/level.component';
import { LevelListComponent } from './component/level-list/level-list.component';
import { LevelCrudComponent } from './component/level-crud/level-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LevelRoutingModule } from './level-routing.module';



@NgModule({
  declarations: [
    LevelComponent,
    LevelListComponent,
    LevelCrudComponent
  ],
  imports: [
    LevelRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LevelModule { }
