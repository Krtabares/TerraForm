import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import { PaymentService } from '../../payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-crud',
  templateUrl: './payment-crud.component.html',
  styleUrls: ['./payment-crud.component.css']
})
export class PaymentCrudComponent implements OnInit {
  // Formularios
  formPayment: FormGroup; // Formulario
  formHasBeenSave = false
  showLoader = true
  disableForm = false
  uuid = null
  viewType = 'add'
  btnlabel = "Agregar"
  studentsSelect = []
  paymentDetail = []
  products=[]
  constructor(private _service: PaymentService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.createForm()
    this.subscribeChangeForm()
    this.loadStudentsSelect()
   }

  ngOnInit(): void {
    this.showLoader = true
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']
      if (this.uuid !== undefined) {
        this.showLoader = false
        this.viewType = 'edit'
        this.loadPayment()
        this.btnlabel = "Guardar"

      } else {
        this.showLoader = false
      }
    });
  }

  loadStudentsSelect() {
    this.showLoader = true
    this._service.getResources().subscribe((res: any) => {
      let result = res
      this.studentsSelect = result.students
      this.products = result.products
      this.showLoader = false
    })

  }

  subscribeChangeForm() {
    // Form Order
    this.formPayment.valueChanges.subscribe(v => {
      if (!this.formPayment.pristine) this.formHasBeenSave = false;
    });
  }

  loadPayment() {
    this.showLoader = true
    this._service.getPaymentsByUuid(this.uuid).subscribe((res: any) => {
      console.log(res)
      this.setFormPayment(res)
      this.showLoader = false
    })

  }

  setFormPayment(Payment) {
    this.formPayment.get('Amount').patchValue(Payment.Amount)
    this.formPayment.get('Currency').patchValue(Payment.Currency)
    this.formPayment.get('Student').patchValue(Payment.Student.UUID)
    this.formPayment.get('PaymentDate').patchValue(Payment.PaymentDate)
    this.formPayment.get('Observation').patchValue(Payment.Observation)
    this.formPayment.get('UUID').patchValue(Payment.UUID)
    this.formPayment.get('PaymentType').patchValue(Payment.PaymentType)
    this.formPayment.get('Reference').patchValue(Payment.Reference)
    this.formPayment.get('Create_at').patchValue(Payment.Create_at)
    this.formPayment.get('Description').patchValue(Payment.Description)
    this.formPayment.get('Status').patchValue(Payment.Status)
    this.totalUSD = Payment.Amount
    this.paymentDetail = Payment.products
  }

  createForm() {
    this.formPayment = new FormGroup({
      Amount: new FormControl(0, [Validators.required]),
      Currency: new FormControl(2),
      Student: new FormControl('', [Validators.required]),
      PaymentDate: new FormControl(''),
      Observation: new FormControl(''),
      UUID: new FormControl(''),
      PaymentType: new FormControl('',[Validators.required]),
      Reference: new FormControl(''),
      Create_at: new FormControl(''),
      Description: new FormControl('',[Validators.required]),
      Status: new FormControl(1, [Validators.required])
    })
  }

  async sendForm() {
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formPayment.valid) {
      this.showLoader = true
      let data = this.formPayment.value
      console.log(this.viewType);

      if (this.viewType == 'add') {
        this._service.addPayment({ payment: data, products: this.paymentDetail }).subscribe(
          async (res: any) => {
            this.alert.success('Registro Creado', 'Se ha creado el registro');
            this.showLoader = false
            this.goBack()
          },
          e => {
            console.log(e);
            this.disableForm = false;
            this.showLoader = false
          }
        );
      } else {
        this.alert.success('Registro Actualizado', 'Se ha actualizado el registro');
        this._service.updPayment({ payment: data, products: this.paymentDetail }).subscribe(
          async (res: any) => {
            // console.log(res);

            // this.router.navigate([`/students`]);
            this.showLoader = false
          },
          e => {
            console.log(e);
            this.disableForm = false;
            this.showLoader = false
          }
        );
      }
    } else {
      this.alert.warning('Campos invalidos', 'Verifique los campos marcados');

    }
  }

  deletePayment() {

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
      if (e.isConfirmed) {
        this._service.delPayment({ uuid: this.uuid }).subscribe((res: any) => {
          this.goBack()
        })

      }

    });

  }

  goBack() {
    this.router.navigate([`admin/payments`]);
  }

  validateCheck(product){
    let found = null
    found = this.paymentDetail.find(item => item.UUID == product.UUID)
    // console.log(found);

    return found? true:false
  }

  totalUSD = 0
  PaymentDescription = ''
  productsOnPayments = []
  onCheckChange(event, product){
    console.log(product);

    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.paymentDetail.push(product);
    }else{
      this.paymentDetail = this.paymentDetail.filter(item => item.UUID != product.UUID)
    }

    this.totalUSD = this.paymentDetail.reduce((sum, prod) => sum + prod.Amount, 0);

    this.formPayment.get('Amount').patchValue(this.totalUSD)

    this.PaymentDescription = this.paymentDetail.reduce((conc, prod)=> conc+' | '+prod.Description,'')

    this.PaymentDescription = this.PaymentDescription.slice(0,99)

    this.formPayment.get('Description').patchValue(this.PaymentDescription)

  }
paymenType = ''
onRadioChange(event) {

  // console.log(event.target.value);
  this.paymenType = event.target.value

}

validatorOfInput(nameInput: string): any {
    let input = this.formPayment.get(nameInput);
  // console.log(nameInput, input);

    let statusInvalid =
      (input.touched && input.invalid) ||
        (this.formHasBeenSave && input.invalid)
        ? true
        : false;
    let msg: string;

    if (statusInvalid) {
      if (input.errors["required"]) {
        msg = 'Campo Requerido.';
        return msg;
      }
      if (input.errors["pattern"]) {
        msg = 'El formato no es valido';
        return msg;
      }
      if (input.errors["minlength"]) {
        msg = `Debe contener al menos ${input.errors["minlength"]['requiredLength']} caracteres`;
        return msg;
      }
      if (input.errors["maxlength"]) {
        let length = input.value.length;
        let value = input.value.substring(0, length - 1);
        input.patchValue(value);
      }
    } else {
      return '';
    }
  }


}
