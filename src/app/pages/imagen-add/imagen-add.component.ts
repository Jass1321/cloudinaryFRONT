import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Imagen } from 'src/app/models/imagen';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenDetailComponent } from '../imagen-detail/imagen-detail.component';

@Component({
  selector: 'app-imagen-add',
  templateUrl: './imagen-add.component.html',
  styleUrls: ['./imagen-add.component.css']
})
export class ImagenAddComponent implements OnInit {

  
  @ViewChild('imagenInputFile', {static: false}) imagenFile!: ElementRef;

  imagen!: File ;
  imagenMin!: File;
  imagenes: Imagen[] = [];


  constructor(
    private imagenService: ImagenService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cargarImagenes();
  
  }

  onFileChange(event:any) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.spinner.show();
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.spinner.hide();
        this.cargarImagenes();
      },
      err => {
        alert(err.error.mensaje);
        this.spinner.hide();
        /* this.reset(); */
      }
    );
  }

  cargarImagenes(): void {
    this.imagenService.list().subscribe(
      data => {
        this.imagenes = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number): void {
    this.imagenService.delete(id).subscribe(
      data => {
        this.cargarImagenes();
      },
      err => {
         console.log(err);
      }
    );
  }

  abrirModal(i: number): void {
    const modalRef = this.modalService.open(ImagenDetailComponent);
    modalRef.componentInstance.index = i;
  }

 /*  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }  */
  

}
