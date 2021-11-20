import { Imagen } from "./imagen";

export class Producto {
    id!: number;
    producto!: string;
    descripcion!: string;
    precio!: number;
    imagenUrl: string;

   constructor(producto: string, descripcion: string,  precio: number, imagenUrl: string) {
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl
    } 
}
