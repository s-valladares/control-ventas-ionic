import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';

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
        loadChildren: () => import('../pedidos/pedidos.module').then(m => m.PedidosPageModule)
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
