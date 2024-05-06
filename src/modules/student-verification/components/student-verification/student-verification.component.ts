import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import { StudentService } from 'src/modules/students/student.service';

@Component({
  selector: 'app-student-verification',
  templateUrl: './student-verification.component.html',
  styleUrls: ['./student-verification.component.css']
})
export class StudentVerificationComponent implements OnInit {

  student:any;
  uuid;
  showLoader=false
  imagePreview
  levelsByStudent
  paymentsByStudents
  qrData
  company

  months = [
    { IdMonth: 1, Amount: '', Status: 1 },
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
    { IdMonth: 12, Amount: '', Status: 1 },
  ]

  constructor(private _service: StudentService, private router: Router, private route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit(): void {


    this.showLoader = true
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']
      this.company = params['company']
      if (this.uuid !== undefined) {
        this.showLoader = false
        this.loadStudent()
        this.qrData = window.location.href
      } else {
        this.showLoader = false
      }
    });
  }

  loadStudent() {
    this.showLoader = true
    this._service.getStudentsByUuidPublic(this.uuid, this.company).subscribe((res: any) => {
      console.log(res)
      let result = res
      this.student = result.student
      if (this.student.Image != '') {
        this.imagePreview = environment.routerImg + this.student.Image
      }
      // this.setFormStudent(result.student)
      this.levelsByStudent = result.levels
      this.paymentsByStudents = result.payments
      this.checkMonthPayment()
      this.showLoader = false
    })

  }


  checkMonthPayment() {

    let monthlypayments = this.paymentsByStudents.filter(pay => { return pay.PaymentType == 1 })

    this.months.forEach(m => {
      const pay = monthlypayments.find(month => { return month.IdMonth == m.IdMonth })
      if (pay) {
        m.Amount = pay.Amount
        m.Status = pay.Status
      }
    });

  }

}
