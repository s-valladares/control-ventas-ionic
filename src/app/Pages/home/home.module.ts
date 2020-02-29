import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { ProductosComponent } from '../Productos/productos-component/productos.component';
import { ProductoConfirmarComponent } from '../Productos/producto-confirmar/producto-confirmar.component';
import { GastoComponent } from '../egresos/gasto/gasto.component';
import { SemanaventaComponent } from '../Ventas/semanaventa/semanaventa.component';
import { InfoPedidoComponent } from '../Reportes/otros/info-pedido/info-pedido.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/pedidos',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'pedidos',
        loadChildren: () => import('../Ventas/pedidos-listar/pedidos.module').then(m => m.PedidosPageModule)
      },
      {
        path: 'egresos',
        loadChildren: () => import('../egresos/egresos.module').then(m => m.EgresosPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('../Productos/productos-listar/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'principal',
        loadChildren: () => import('../principal/principal.module').then( m => m.PrincipalPageModule)
      },
      {
        path: 'ventas',
        loadChildren: () => import('../Reportes/ventas/ventas.module').then( m => m.VentasPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    ProductosComponent,
    ProductoConfirmarComponent,
    GastoComponent,
    SemanaventaComponent,
    InfoPedidoComponent
  ],
  entryComponents: [
    ProductosComponent,
    ProductoConfirmarComponent,
    GastoComponent,
    SemanaventaComponent,
    InfoPedidoComponent
  ]
})
export class HomePageModule { }
