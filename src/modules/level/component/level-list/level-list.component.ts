import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../level.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  Levels = []
  showLoader = true
  metrics = {
    completed: 0,
    electronic: 0,
    cash: 0,
    pending: 0
  }

  constructor(private _service: LevelService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.showLoader = true
    this._service.getLevels().subscribe((res: any) => {
      console.log(res)
      this.Levels = res
      this.showLoader = false
    })
    // this.loadAnalytics()
  }

  loadAnalytics() {
    // this.showLoader = true
    // this._service.getAnalytics().subscribe((res: any) => {
    //   console.log(res)
    //   this.metrics = res
    //   this.showLoader = false
    // })
  }

  deleteLevel(event) {

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
      console.log(e);
      this.showLoader = true
      if (e.isConfirmed) {
        this._service.delLevel({ uuid: event.uuid }).subscribe((res: any) => {
          this.showLoader = false
          this.getList()
        })
      } else {
        this.showLoader = false
      }

    });

  }

  goToAdd() {
    this.router.navigate([`admin/levels/new`]);
  }

}
