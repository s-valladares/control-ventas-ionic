import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ProductosComponent } from '../productos-component/productos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductosPageRoutingModule
  ],
  declarations: [
    ProductosPage,
    ProductosComponent
  ],
  entryComponents: [
    ProductosComponent
  ]
})
export class ProductosPageModule {}
