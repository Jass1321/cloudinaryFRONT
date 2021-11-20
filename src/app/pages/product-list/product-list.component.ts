import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
   this.cargarProductos();
  }


  cargarProductos(): void {
    this.productoService.list().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.spinner.show();
    this.productoService.delete(id).subscribe(
      data => {
        this.spinner.hide();
        this.cargarProductos();
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  

}
