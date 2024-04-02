import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  Students = []
  showLoader = true
  metrics = {
    actives:{total:0},
    girls:{total:0},
    mens:{total:0},
    Birthdate:{total:0}
  }
  constructor(private _service: StudentService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getList()

  }

  getList(){
    this.showLoader = true
    this._service.getStudents().subscribe((res: any) => {
      this.Students = res
      this.showLoader = false
    })
    this.loadAnalytics()
  }

  loadAnalytics() {
    this.showLoader = true
    this._service.getAnalytics().subscribe((res: any) => {
      console.log(res)
      this.metrics = res
      this.showLoader = false
    })
  }


  deleteStudent(event){

    Swal.fire({
      title: 'Cuidado',
      text: '¿Desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then(e => {
      this.showLoader = true
      if (e.isConfirmed){
        this._service.delStudent({ uuid: event.uuid }).subscribe((res: any) => {
          this.showLoader = false
          this.getList()
        })
      }else{
        this.showLoader = false
      }

    });

  }

  goToAdd(){
    this.router.navigate([`admin/students/new`]);
  }

}
