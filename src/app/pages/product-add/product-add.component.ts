import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ImagenService } from '../../services/imagen.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { Imagen } from 'src/app/models/imagen';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  producto = '';
  descripcion = '';
  imagenUrl = '';
  precio: number = 0;

  imagenes: any;

  constructor(
    public productoService: ProductoService,
    public imagenService: ImagenService,
    private router: Router,
  ) { }

  ngOnInit() {   
    this.cargarImagenes();
   }

   cargarImagenes(): void {
     this.imagenService.list().subscribe(
       data => {
         this.imagenes= data;
       },
       err => {
         console.log(err);
       }
     );
   }
 

  onCreate(): void {
    const producto = new Producto(this.producto, this.descripcion, this.precio, this.imagenUrl);
    this.productoService.save(producto).subscribe(
      resp => {
        this.router.navigate(['/']);
    },
      error => { console.error(error) }
    )
  }

}
