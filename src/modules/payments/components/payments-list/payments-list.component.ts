import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {

  Payments = []
  showLoader = true
  metrics = {
    completed: 0,
    electronic: 0,
    cash: 0,
    pending: 0
  }

  constructor(private _service: PaymentService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.showLoader = true
    this._service.getPayments().subscribe((res: any) => {
      console.log(res)
      this.Payments = res
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

  deletePayment(event) {

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
        this._service.delPayment({ uuid: event.uuid }).subscribe((res: any) => {
          this.showLoader = false
          this.getList()
        })

      } else {
        this.showLoader = false
      }

    });

  }

  goToAdd() {
    this.router.navigate([`admin/payments/new`]);
  }

}
