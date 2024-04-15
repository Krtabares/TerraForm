import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('discountInput', { static: true }) discountInput: ElementRef;
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
  levels = []
  months =[]
  discount = 0
  totalUSD = 0
  PaymentDescription = ''
  productsOnPayments = []

  constructor(private _service: PaymentService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.createForm()
    this.subscribeChangeForm()
    this.loadSelects()
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

  loadSelects() {
    this.showLoader = true
    this._service.getResources().subscribe((res: any) => {
      let result = res
      this.studentsSelect = result.students
      this.products = result.products
      this.levels = result.levels
      this.months = result.months
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
    this.formPayment.get('PaymentMethod').patchValue(Payment.PaymentMethod)
    this.formPayment.get('PaymentType').patchValue(Payment.PaymentType.toString())
    this.formPayment.get('Reference').patchValue(Payment.Reference)
    this.formPayment.get('Create_at').patchValue(Payment.Create_at)
    this.formPayment.get('Description').patchValue(Payment.Description)
    this.formPayment.get('Status').patchValue(Payment.Status)
    if (Payment.Discount && Payment.Discount.Amount){
      this.formPayment.get('Discount').patchValue(Payment.Discount.Amount)
      this.discount = Payment.Discount.Amount
    }
    this.paymentType = Payment.PaymentType.toString()

    if (Payment.PaymentType == 2){
      this.formPayment.get('IdMonth').disable()
      this.paymentDetail = Payment.products
    }else{
      this.formPayment.get('IdMonth').patchValue(Payment.MonthlyPayment.IdMonth)
      this.formPayment.get('IdMonth').enable()
      this.paymentDetail = Payment.levels
    }
    this.calculateTotals()
    this.pendingAmountCheck(Payment.Amount)
  }

  createForm() {
    this.formPayment = new FormGroup({
      Amount: new FormControl(0, [Validators.required]),
      Currency: new FormControl(2),
      Student: new FormControl('', [Validators.required]),
      PaymentDate: new FormControl(''),
      Observation: new FormControl(''),
      UUID: new FormControl(''),
      PaymentMethod: new FormControl('',[Validators.required]),
      PaymentType: new FormControl(1, [Validators.required]),
      Reference: new FormControl(''),
      Create_at: new FormControl(''),
      Description: new FormControl('',[Validators.required]),
      Status: new FormControl(3, [Validators.required]),
      IdMonth: new FormControl(null, [Validators.required]),
      Discount: new FormControl(null),
    })
    this.formPayment.controls['PaymentType'].setValue('1')
    this.paymentType=1
  }

  async sendForm() {
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formPayment.valid) {
      this.showLoader = true
      this.formPayment.get('Status').enable()
      let data = this.formPayment.value
      let body: any = {}
      body.payment = data

      if(this.discount){
        body.discount = data.Discount
      }

      if (data.PaymentType == 1) {
        body.levels = this.paymentDetail
      } else if (data.PaymentType == 2) {
        body.products = this.paymentDetail
      }

      if(data.Amount<=0){
        this.alert.error('Error en el monto', 'No puede registrar un pago en cero');
        this.showLoader = false
        return
      }
      if (this.viewType == 'add') {

        this._service.addPayment(body).subscribe(
          async (res: any) => {
            this.alert.success('Registro Creado', 'Se ha creado el registro');

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
        this._service.updPayment(body).subscribe(
          async (res: any) => {
            this.formPayment.get('Status').disable()
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

  validateCheck(element){
    let found = null
    found = this.paymentDetail.find(item => item.UUID == element.UUID)
    // console.log(found);

    return found? true:false
  }

  onChangeStudent(){
    this.showLoader = true
    this._service.getLevelsbyStudents(this.formPayment.get('Student').value).subscribe((res: any) => {
      // console.log(res)
      // this.setFormPayment(res)
      let result = res
      this.paymentDetail=[]
      // agrega los niveles que tiene inscritos al pago
      result.forEach(e => {
        let lvl = this.levels.find(item => item.UUID == e.UUID)
        this.paymentDetail.push(lvl)
        this.calculateTotals()
      });
      this.showLoader = false
    })
  }


  onCheckChange(event, product){
    console.log(product);

    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.paymentDetail.push(product);
    }else{
      this.paymentDetail = this.paymentDetail.filter(item => item.UUID != product.UUID)
    }

    this.calculateTotals()

  }
  paymentMethod = ''
  onRadioChange(event) {

    // console.log(event.target.value);
    this.paymentMethod = event.target.value

  }

  paymentType = null
  onRadioChangeLevels(evt){
    this.paymentType = evt.target.value
    this.paymentDetail=[]
    if (this.paymentType == 2) {
      this.formPayment.get('IdMonth').disable()
    } else {
      this.formPayment.get('IdMonth').enable()
    }
  }

  LevelsOnPayments = []
  onCheckChangeLevels(event, levels) {
    console.log(levels);

    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.paymentDetail.push(levels);
    } else {
      this.paymentDetail = this.paymentDetail.filter(item => item.UUID != levels.UUID)
    }

    this.calculateTotals()
    this.pendingAmountCheck()
  }

  calculateTotals(){
    if (this.discount > this.totalUSD) {
      this.deleteDiscount()
    }
    this.totalUSD = this.paymentDetail.reduce((sum, prod) => sum + prod.Amount, 0) - this.discount;

    this.PaymentDescription = this.paymentDetail.reduce((conc, prod) => conc + ' | ' + prod.Description, '')

    this.PaymentDescription = this.PaymentDescription.slice(0, 99)

    this.formPayment.get('Description').patchValue(this.PaymentDescription)
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

    // if (nameInput =="IdMonth" ){
    //   msg = 'Campo Requerido.';
    //   return msg;
    // }

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

  pagoIncompleto = false
  pendingAmount = 0
  checkTotalStatus(evt){
    console.log(evt.target.value);

    this.formPayment.get('Status').disable()
    if (this.totalUSD > evt.target.value){
      this.pendingAmount = this.totalUSD - parseFloat(evt.target.value)
      this.pagoIncompleto=true
      this.formPayment.get('Status').patchValue(2)
    } else if (this.totalUSD == evt.target.value){
      this.formPayment.get('Status').patchValue(3)
      this.pagoIncompleto = false
    }
  }

  pendingAmountCheck(amount = null ){
    if (amount == null){
      amount = this.formPayment.get('Amount').value
    }
    if (this.totalUSD > amount) {
      this.pendingAmount = this.totalUSD - amount
      this.pagoIncompleto = true
      this.formPayment.get('Status').patchValue(2)
      this.formPayment.get('Status').disable()
    } else {
      this.pagoIncompleto = false
      this.formPayment.get('Status').patchValue(3)
      this.formPayment.get('Status').enable()
    }
  }

  addDiscount(){
    let disc = parseFloat(this.discountInput.nativeElement.value)
    if(disc <= this.totalUSD){
      this.discount = disc
      this.formPayment.get('Discount').patchValue(disc)
      this.calculateTotals()
      let amount = this.formPayment.get('Amount').value
      this.pendingAmountCheck(amount)

      this.alert.success('Exito', 'Descuento agregado')
    }else{
      this.alert.error('Error','El monto del descuento no puede ser mayor al total')
    }
  }

  deleteDiscount(){
    this._service.deleteDiscount({uuid:this.uuid}).subscribe((res: any) => {
      this.discount = 0
      this.calculateTotals()
      let amount = this.formPayment.get('Amount').value
      this.pendingAmountCheck(amount)
      this.alert.warning('Alerta', 'Descuento Eliminado')
    })
  }

}
