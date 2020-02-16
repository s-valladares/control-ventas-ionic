import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';
import { PedidosComponent } from '../pedidos-component/pedidos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
  ],
  declarations: [
    PedidosPage,
    PedidosComponent
  ],
  entryComponents: [
    PedidosComponent
  ]
})
export class PedidosPageModule {}
