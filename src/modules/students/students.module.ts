import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './components/students/students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsCrudComponent } from './components/students-crud/students-crud.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsCrudComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    // ToastrModule
  ],
})
export class StudentsModule { }
