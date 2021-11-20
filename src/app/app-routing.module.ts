import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagenAddComponent } from './pages/imagen-add/imagen-add.component';
import { ImagenDetailComponent } from './pages/imagen-detail/imagen-detail.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'add-product', component: ProductAddComponent},
  {path: 'add-image', component: ImagenAddComponent},
  {path: 'detail', component: ImagenDetailComponent},
  {path: 'edit-product/:id', component: ProductEditComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
