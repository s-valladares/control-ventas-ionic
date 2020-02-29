import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  ProductosService,
  PedidosService,
  EgresosService,
  VentasService
} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    ProductosService,
    PedidosService,
    EgresosService,
    VentasService
  ]
})
export class ServicesModule { }
