import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import { UserService } from '../../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.css']
})
export class UsersCrudComponent implements OnInit {
  // Formularios
  formUser: FormGroup; // Formulario
  formHasBeenSave = false
  showLoader = true
  disableForm = false
  uuid = null
  viewType = 'add'
  btnlabel = "Agregar"
  constructor(private _service: UserService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.createForm()
    this.subscribeChangeForm()
   }

  ngOnInit(): void {
    this.showLoader = true
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']
      if (this.uuid !== undefined) {
        this.showLoader = false
        this.viewType = 'edit'
        this.loadStudent()
        this.btnlabel = "Guardar"

      } else {
        this.showLoader = false
      }
    });
  }

  loadStudent() {
    this.showLoader = true
    this._service.getUserByUuid(this.uuid).subscribe((res: any) => {
      console.log(res)
      this.setFormStudent(res)
      this.showLoader = false
    })

  }

  subscribeChangeForm() {
    // Form Order
    this.formUser.valueChanges.subscribe(v => {
      if (!this.formUser.pristine) this.formHasBeenSave = false;
    });
  }

  createForm() {
    this.formUser = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      CI: new FormControl('',[Validators.required]),
      Image: new FormControl(''),
      Observation: new FormControl(''),
      Status: new FormControl(1),
      UUID: new FormControl(''),
      Email: new FormControl('',[Validators.required]),
      Password: new FormControl('', [Validators.required])
    })
  }

  setFormStudent(User) {
    this.formUser.get('Name').patchValue(User.Name)
    this.formUser.get('CI').patchValue(User.CI)
    this.formUser.get('Image').patchValue(User.Image)
    this.formUser.get('Observation').patchValue(User.Observation)
    this.formUser.get('Email').patchValue(User.Email)
    this.formUser.get('Status').patchValue(User.Status)
    this.formUser.get('UUID').patchValue(User.UUID)
    this.formUser.get('Password').patchValue(User.Password)
  }

  async sendForm() {
    this.showLoader = true
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formUser.valid) {
      let data = this.formUser.value
      console.log(this.viewType);

      if (this.viewType == 'add') {
        this._service.addUser({ student: data }).subscribe(
          async (res: any) => {
            this.alert.success('Registro Creado', 'Se ha creado el registro');
            this.showLoader = false
          },
          e => {
            console.log(e);
            this.disableForm = false;
            this.showLoader = false
          }
        );
      } else {
        this.alert.success('Registro Actualizado', 'Se ha actualizado el registro');
        this._service.updUser({ student: data }).subscribe(
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
      this.alert.warning('Campos invalidos', 'Verifique los campos marcados');

    }
  }

  deleteUser() {

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
        this._service.delUser({ uuid: this.uuid }).subscribe((res: any) => {
          this.goBack()
        })

      }

    });

  }

  goBack() {
    this.router.navigate([`admin/User`]);
  }

}
