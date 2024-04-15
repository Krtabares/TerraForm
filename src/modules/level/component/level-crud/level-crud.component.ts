import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import { LevelService } from '../../level.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-level-crud',
  templateUrl: './level-crud.component.html',
  styleUrls: ['./level-crud.component.css']
})
export class LevelCrudComponent implements OnInit {
  formLevel: FormGroup; // Formulario
  formStudent: FormGroup; // Formulario
  formHasBeenSave = false
  hasnewimage = false
  showLoader = true
  disableForm = false
  uuid = null
  viewType = 'add'
  btnlabel = "Agregar"
  studentToAddUUID = null
  StudentsBylevel = []

  constructor(private _service: LevelService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.createForm()
    this.subscribeChangeForm()
    this.loadSelect()
  }

  ngOnInit(): void {
    this.showLoader = true
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']
      if (this.uuid !== undefined) {
        this.showLoader = false
        this.viewType = 'edit'
        this.loadlevel()
        this.btnlabel = "Guardar"

      } else {
        this.showLoader = false
      }
    });
  }

  subscribeChangeForm() {
    // Form Order
    this.formLevel.valueChanges.subscribe(v => {
      if (!this.formLevel.pristine) this.formHasBeenSave = false;
    });
  }

  loadlevel() {
    this.showLoader = true
    this._service.getLevelByUuid(this.uuid).subscribe((res: any) => {
      // console.log(res)
      this.StudentsBylevel = res.StudentsBylevel
      this.filterStudentsRegistred()
      this.setFormProduct(res)
      this.showLoader = false
    })

  }

  setFormProduct(level) {
    this.formLevel.get('Name').patchValue(level.Name)
    this.formLevel.get('Amount').patchValue(level.Amount)
    this.formLevel.get('Description').patchValue(level.Description)
    this.formLevel.get('Status').patchValue(level.Status)
    this.formLevel.get('UUID').patchValue(level.UUID)
  }

  createForm() {
    this.formLevel = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Amount: new FormControl(0, [Validators.required]),
      Observation: new FormControl(''),
      Description: new FormControl(''),
      Company: new FormControl(''),
      Status: new FormControl(1),
      UUID: new FormControl('')
    })
    this.formStudent = new FormGroup({
      UUID: new FormControl('')
    })
  }

  async sendForm() {
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formLevel.valid) {
      this.showLoader = true
      let data = this.formLevel.value
      // console.log(this.viewType);


      if (this.viewType == 'add') {
        this._service.addLevel({ level: data }).subscribe(
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
        this._service.updLevel({ level: data }).subscribe(
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

  deleteProduct() {

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
        this._service.delLevel({ uuid: this.uuid }).subscribe((res: any) => {
          this.goBack()
        })

      }

    });

  }

  goBack() {
    this.router.navigate([`admin/levels`]);
  }

  validatorOfInput(nameInput: string): any {
    let input = this.formLevel.get(nameInput);
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

  studentsSelect=[]
  studentsSelectAux = []
  loadSelect() {
    this.showLoader = true
    this._service.getResources().subscribe((res: any) => {
      let result = res
      this.studentsSelectAux = result.students
      this.filterStudentsRegistred()
      this.showLoader = false
    })
  }

  filterStudentsRegistred() {
    this.studentsSelect = this.studentsSelectAux.filter((student) => {
      return !this.StudentsBylevel.some((resgistrered) => resgistrered.studentUUID === student.UUID);
    });
  }

  selecteStudentUUID= null
  selectStudent(evt){
    // console.log(evt);
    this.selecteStudentUUID = evt.target.value
  }

  registreStudent(){
    this.showLoader = true
    this._service.registrationStudent({ student: this.selecteStudentUUID, level: this.uuid }).subscribe((res: any) => {
      this.alert.success("Inscripcion","la inscripcion fue exitosa")
      // console.log(res);
      this.StudentsBylevel = res
      this.filterStudentsRegistred()
      this.toggleModal()
      this.showLoader = false
    })
  }

  deleteRegistrationStudent(event) {

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
        this._service.DeleteRegistrationStudent({ student: event.uuid, level: this.uuid }).subscribe((res: any) => {
          this.StudentsBylevel=res
          this.filterStudentsRegistred()
          this.showLoader = false
        })
      } else {
        this.showLoader = false
      }

    });

  }

}
