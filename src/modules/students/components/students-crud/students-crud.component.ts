import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import Swal from 'sweetalert2';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/guard/auth/auth.service';
import { LevelService } from 'src/modules/level/level.service';

declare let html2canvas: any;

@Component({
  selector: 'app-students-crud',
  templateUrl: './students-crud.component.html',
  styleUrls: ['./students-crud.component.css']
})
export class StudentsCrudComponent implements OnInit {

  // Formularios
  formStudent: FormGroup; // Formulario
  formLevel: FormGroup;
  formHasBeenSave = false
  hasnewimage = false
  showLoader = true
  disableForm= false
  uuid = null
  viewType = 'add'
  btnlabel = "Agregar"
  base64Data =''
  levelsByStudent=[]
  paymentsByStudents=[]
  selectedFile: File = null;
  imagePreview: string | ArrayBuffer = "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
  qrData

  months = [
    { IdMonth: 1, Amount: '', Status:1 },
    { IdMonth: 2, Amount: '', Status:1 },
    { IdMonth: 3, Amount: '', Status:1 },
    { IdMonth: 4, Amount: '', Status:1 },
    { IdMonth: 5, Amount: '', Status:1 },
    { IdMonth: 6, Amount: '', Status:1 },
    { IdMonth: 7, Amount: '', Status:1 },
    { IdMonth: 8, Amount: '', Status:1 },
    { IdMonth: 9, Amount: '', Status:1 },
    { IdMonth: 10, Amount: '', Status:1 },
    { IdMonth: 11, Amount: '', Status:1 },
    { IdMonth: 12, Amount: '', Status:1 },
  ]

  constructor(private _service: StudentService, private __levelServ: LevelService, private router: Router, private route: ActivatedRoute, private alert: AlertService, private auth: AuthService) {
    this.createForm()
    this.subscribeChangeForm()
  }

  ngOnInit(): void {
    console.log(window.location.origin);

    this.showLoader = true
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']
      if (this.uuid !== undefined){
        this.showLoader = false
        this.viewType = 'edit'
        this.loadStudent()
        this.btnlabel = "Guardar"
        this.qrData = environment.verification+this.auth.getUser().company+'/'+this.uuid
      }else{
        this.showLoader = false
      }
      this.loadSelects()
    });
  }

  ngOnDestroy(): void {


  }

  subscribeChangeForm() {
    // Form Order
    this.formStudent.valueChanges.subscribe(v => {
      if (!this.formStudent.pristine) this.formHasBeenSave = false;
    });
  }

  loadStudent() {
    this.showLoader = true
      this._service.getStudentsByUuid(this.uuid).subscribe((res:any)=>{
        console.log(res)
        let result = res
        this.setFormStudent(result.student)
        this.levelsByStudent = result.levels
        this.paymentsByStudents = result.payments
        this.checkMonthPayment()
        this.showLoader = false
      })

  }

  loadSelects(){
    this.showLoader = true
    this._service.getResources().subscribe((res: any) => {
      console.log(res)
      let result = res
      this.LevelSelectAux = res
      this.filterLevelsRegistred()
      this.showLoader = false
    })
  }
  levelSelect=[]
  LevelSelectAux =[]
  filterLevelsRegistred() {
    this.levelSelect = this.LevelSelectAux.filter((level) => {
      return !this.levelsByStudent.some((resgistrered) => resgistrered.UUID === level.UUID);
    });
  }

  selecteLevelUUID = null
  selectLevel(evt) {
    this.selecteLevelUUID = evt.target.value
  }

  registreLevel() {
    this.showLoader = true
    this.__levelServ.registrationStudent({ student: this.uuid, level: this.selecteLevelUUID, getLevelsByStudents:true }).subscribe((res: any) => {
      this.alert.success("Inscripcion", "la inscripcion fue exitosa")
      // console.log(res);
      this.levelsByStudent = res
      this.filterLevelsRegistred()
      this.toggleModal()
      this.showLoader = false
    })
  }

  setFormStudent(student) {
    this.formStudent.get('Name').patchValue(student.Name)
    this.formStudent.get('CI').patchValue(student.CI)
    this.formStudent.get('Birthdate').patchValue(student.Birthdate)
    this.formStudent.get('LegalRepresentative').patchValue(student.LegalRepresentative)
    this.formStudent.get('PhoneNumber').patchValue(student.PhoneNumber)
    this.formStudent.get('PhoneNumberLegalRepresentative').patchValue(student.PhoneNumberLegalRepresentative)
    this.formStudent.get('Image').patchValue(student.Image)
    if (student.Image != '') {
      this.imagePreview = environment.routerImg + student.Image
    }
    this.formStudent.get('Direction').patchValue(student.Direction)
    this.formStudent.get('Observation').patchValue(student.Observation)
    this.formStudent.get('Gender').patchValue(student.Gender)
    this.formStudent.get('Company').patchValue(student.Company)
    this.formStudent.get('Status').patchValue(student.Status)
    this.formStudent.get('UUID').patchValue(student.UUID)
  }

  createForm(){
    this.formStudent = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      CI: new FormControl(''),
      Birthdate: new FormControl('', [Validators.required]),
      LegalRepresentative: new FormControl(''),
      PhoneNumber: new FormControl(''),
      PhoneNumberLegalRepresentative: new FormControl(''),
      Image: new FormControl(''),
      Direction: new FormControl(''),
      Observation: new FormControl(''),
      Gender: new FormControl('', [Validators.required]),
      Company: new FormControl(''),
      Status: new FormControl(1),
      UUID: new FormControl(''),
      base64Data: new FormControl(null)
    })
    this.formLevel = new FormGroup({
      UUID: new FormControl('')
    })
  }

  async sendForm() {
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formStudent.valid) {
      this.showLoader = true
      let data = this.formStudent.value
      // console.log(this.viewType);


      if(this.viewType == 'add'){
        this._service.addStudent({ student: data, hasnewimage: this.hasnewimage }).subscribe(
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
      }else{
        this.alert.success('Registro Actualizado', 'Se ha actualizado el registro');
        this._service.updStudent({ student: data, hasnewimage: this.hasnewimage }).subscribe(
          async (res: any) => {
            console.log(res);

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
      this.showLoader = false
      this.alert.warning('Campos invalidos', 'Verifique los campos marcados');

    }
  }

  deleteStudent() {

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
        this._service.delStudent({ uuid: this.uuid }).subscribe((res: any) => {
          this.goBack()
        })

      }

    });

  }

  goBack(){

    if (
      (this.formStudent.dirty || this.hasnewimage ) && !this.formHasBeenSave
    ) {
      Swal.fire({
        title: 'Cambios sin guardar',
        text: 'Algunos cambios no fueron guardados, ¿Deseas Guardarlos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Guardar!',
        cancelButtonText: 'Cancelar',
      }).then(e => {
        if (e.isConfirmed) {
          this.sendForm();
        }
      });
    }
    this.router.navigate([`admin/students`]);
  }

  gotoPayment(){
    if (
      (this.formStudent.dirty || this.hasnewimage) && !this.formHasBeenSave
    ) {
      Swal.fire({
        title: 'Cambios sin guardar',
        text: 'Algunos cambios no fueron guardados, ¿Deseas Guardarlos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Guardar!',
        cancelButtonText: 'Cancelar',
      }).then(e => {
        if (e.isConfirmed) {
          this.sendForm();
        }
      });
    }
    this.router.navigate([`admin/students`]);

  }

  onFileSelected(event) {
    console.log(event);

    if (event instanceof WebcamImage){
      this.imagePreview = event.imageAsDataUrl
      this.base64Data = event.imageAsDataUrl
      this.formStudent.get('base64Data').patchValue(this.base64Data)
    }else{

      this.selectedFile = <File>event.target.files[0];
      // Vista previa de la imagen
      const reader = new FileReader();

      reader.onload = (e) => {
        // console.log();

        this.base64Data = reader.result as string;
        this.imagePreview = reader.result;
        // console.log(this.base64Data);
        this.formStudent.get('base64Data').patchValue(this.base64Data)
      }
      reader.readAsDataURL(this.selectedFile);
    }
    this.hasnewimage = true

    // console.log(this.formStudent.get('base64Data').value);
  }

  validatorOfInput(nameInput: string):any {
    let input = this.formStudent.get(nameInput);
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

  showModal = false
  toggleModal() {
    this.showModal = !this.showModal
  }

  checkMonthPayment(){

    let  monthlypayments = this.paymentsByStudents.filter(pay => { return pay.PaymentType == 1 })

    this.months.forEach(m => {
      const pay = monthlypayments.find(month => { return month.IdMonth == m.IdMonth })
      if (pay){
        m.Amount = pay.Amount
        m.Status = pay.Status
      }
    });

  }

  capturedImage
  @ViewChild('capture', { static: true }) capture: ElementRef;
  shareQR(){
    console.log("llego");
    console.log(this.capture);

    html2canvas(this.capture.nativeElement).then(canvas => {
      console.log("html2canvas");
      this.capturedImage = canvas.toDataURL();
      console.log("capturedImage");
      console.log("canvas.toDataURL() -->" + this.capturedImage);
      if (navigator.share) {
        // Enable the Web Share API button
        // const shareButton = document.getElementById('shareButton');
        // shareButton.addEventListener('click', () => {
          let file = this.dataURLtoFile(this.capturedImage, "QrTerraForm.jpg")
          navigator.share({
            title: 'Awesome Content',
            text: 'Check out this awesome content!',
            url: 'https://example.com',
            files: [file]
          })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Sharing failed:', error));
        // });
      } else {
        // If Web Share API is not supported, hide the button
        // const shareButton = document.getElementById('shareButton');
        // shareButton.style.display = 'none';
      }
    });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

}
