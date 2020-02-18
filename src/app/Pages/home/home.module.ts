import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { ProductosComponent } from '../Productos/productos-component/productos.component';
import { ProductoConfirmarComponent } from '../Productos/producto-confirmar/producto-confirmar.component';

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
    ProductoConfirmarComponent
  ],
  entryComponents: [
    ProductosComponent,
    ProductoConfirmarComponent
  ]
})
export class HomePageModule { }
