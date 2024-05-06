import { months } from './../../../shared/class/months';
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
  StudentsMonths = []
  showMonthlyPaymentOverview = false
  constructor(private _service: PaymentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.showLoader = true
    this._service.getPayments().subscribe((res: any) => {
      // console.log(res)
      this.Payments = res
      this.showLoader = false
    })
    this.loadAnalytics()
  }

  getListMonthlyPaymentOverview() {
    this.showLoader = true
    this._service.getPaymentsMonthlyPaymentOverview().subscribe((res: any) => {
      // console.log(res)

      let  students = res

      students.forEach(s => {
        let m = [{ IdMonth: 1, Amount: '', Status: 1 },
          { IdMonth: 2, Amount: '', Status: 1 },
          { IdMonth: 3, Amount: '', Status: 1 },
          { IdMonth: 4, Amount: '', Status: 1 },
          { IdMonth: 5, Amount: '', Status: 1 },
          { IdMonth: 6, Amount: '', Status: 1 },
          { IdMonth: 7, Amount: '', Status: 1 },
          { IdMonth: 8, Amount: '', Status: 1 },
          { IdMonth: 9, Amount: '', Status: 1 },
          { IdMonth: 10, Amount: '', Status: 1 },
          { IdMonth: 11, Amount: '', Status: 1 },
          { IdMonth: 12, Amount: '', Status: 1 },]
        s.payments.forEach(pay => {
          m[(pay.IdMonth)-1] = pay
        });
        this.StudentsMonths.push({Name: s.Name, payments:m})
      });
      // this.Payments = res

      // console.log(this.StudentsMonths);

      this.showLoader = false
    })
  }

  loadAnalytics() {
    this.showLoader = true
    this._service.getAnalytics().subscribe((res: any) => {
      // console.log(res)
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

  toggleTable(){

    this.showMonthlyPaymentOverview = !this.showMonthlyPaymentOverview
    if(this.showMonthlyPaymentOverview){
      this.getListMonthlyPaymentOverview()
    }
  }

}
