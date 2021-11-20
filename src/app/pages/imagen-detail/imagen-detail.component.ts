import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../../services/imagen.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Imagen } from '../../models/imagen';

@Component({
  selector: 'app-imagen-detail',
  templateUrl: './imagen-detail.component.html',
  styles: [
  ]
})
export class ImagenDetailComponent implements OnInit {

  @Input() index:any;

  imagenes: Imagen[] = [];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(
    private activeModal: NgbActiveModal,
    private imagenService: ImagenService
  ) { }

  ngOnInit() {
    this.config.initialSlide = this.index;
    this.imagenService.list().subscribe(
      data => {
        this.imagenes = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
