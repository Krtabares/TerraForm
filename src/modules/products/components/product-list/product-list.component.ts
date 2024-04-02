import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  Products = []
  showLoader = true
  metrics = {
    completed: 0,
    electronic: 0,
    cash: 0,
    pending: 0
  }

  constructor(private _service: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.showLoader = true
    this._service.getProducts().subscribe((res: any) => {
      console.log(res)
      this.Products = res
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

  deleteProduct(event) {

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
        this._service.delProduct({ uuid: event.uuid }).subscribe((res: any) => {
          this.showLoader = false
          this.getList()
        })
      } else {
        this.showLoader = false
      }

    });

  }

  goToAdd() {
    this.router.navigate([`admin/products/new`]);
  }

}
