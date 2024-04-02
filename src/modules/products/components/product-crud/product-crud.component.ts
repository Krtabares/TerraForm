import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/modules/shared/services/alerts.service';
import Swal from 'sweetalert2';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  formProduct: FormGroup; // Formulario
  formHasBeenSave = false
  hasnewimage = false
  showLoader = true
  disableForm = false
  uuid = null
  viewType = 'add'
  btnlabel = "Agregar"

  constructor(private _service: ProductsService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
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
        this.loadProduct()
        this.btnlabel = "Guardar"

      } else {
        this.showLoader = false
      }
    });
  }

  subscribeChangeForm() {
    // Form Order
    this.formProduct.valueChanges.subscribe(v => {
      if (!this.formProduct.pristine) this.formHasBeenSave = false;
    });
  }

  loadProduct() {
    this.showLoader = true
    this._service.getProductByUuid(this.uuid).subscribe((res: any) => {
      console.log(res)
      this.setFormProduct(res)
      this.showLoader = false
    })

  }

  setFormProduct(product) {
    this.formProduct.get('Name').patchValue(product.Name)
    this.formProduct.get('Amount').patchValue(product.Amount)
    this.formProduct.get('Observation').patchValue(product.Observation)
    this.formProduct.get('Description').patchValue(product.Description)
    this.formProduct.get('Status').patchValue(product.Status)
    this.formProduct.get('UUID').patchValue(product.UUID)
  }

  createForm() {
    this.formProduct = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Amount: new FormControl(0, [Validators.required]),
      Observation: new FormControl(''),
      Description: new FormControl(''),
      Company: new FormControl(''),
      Status: new FormControl(1),
      UUID: new FormControl('')
    })
  }

  async sendForm() {
    this.formHasBeenSave = true;
    this.disableForm = true;
    if (this.formProduct.valid) {
      this.showLoader = true
      let data = this.formProduct.value
      // console.log(this.viewType);


      if (this.viewType == 'add') {
        this._service.addProduct({ product: data }).subscribe(
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
        this._service.updProduct({ product: data }).subscribe(
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
        this._service.delProduct({ uuid: this.uuid }).subscribe((res: any) => {
          this.goBack()
        })

      }

    });

  }

  goBack() {
    this.router.navigate([`admin/products`]);
  }

  validatorOfInput(nameInput: string): any {
    let input = this.formProduct.get(nameInput);
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
