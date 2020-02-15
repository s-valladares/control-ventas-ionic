import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ProductosComponent } from '../productos/productos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
