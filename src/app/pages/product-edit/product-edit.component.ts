import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productos: any = null;
  imagenes: any;

  constructor(
    public productoService: ProductoService,
    public imagenService: ImagenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );

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


  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.update(id, this.productos).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => { console.error(error) }
    );
  }
}
