import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Config } from '../Config/config';
import { IPedidos, IPedidosRs, IPedidosDetallesRs, IPedidosDetalles } from './pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private mUrl = Config.url;
  private mService = 'pedidos';

  constructor(
    private httpClient: HttpClient,
  ) { }

  // Obtener listado de Pedidos
  getAll() {
    return this.httpClient.get(this.mUrl + this.mService).pipe(
      map((data: IPedidosRs) => {
        return data;
      })).toPromise();
  }


  // Obtener pedido por id
  getId(id: string) {
    return this.httpClient.get(this.mUrl + this.mService + '/' + id).pipe(
      map((data: IPedidos) => {
        return data;
      })).toPromise();
  }

  // Actualizar pedido
  update(id: string, obj: IPedidos) {
    return this.httpClient.put(this.mUrl + this.mService + '/' + id, obj).pipe(
      map((data: IPedidos) => {
        return data;
      })).toPromise();
  }

  // Crear pedido
  create(obj: IPedidos) {
    return this.httpClient.post(this.mUrl + this.mService, obj).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }

  // Eliminar pedido
  delete(pKey: string) {
    return this.httpClient.delete(this.mUrl + this.mService + '/' + pKey)
      // tslint:disable-next-line: arrow-return-shorthand
      .pipe(map((data: any) => { return data; }))
      .toPromise();
  }



/*******-----------    DETALLES DE PEDIDO  -------------------------------------------*/

  // Obtener detalles de pedido a partir de id de pedido
  getAllDetallesPedidoId(id) {
    return this.httpClient.get(this.mUrl + this.mService + '/detalles/' + id).pipe(
      map((data: IPedidosDetallesRs) => {
        return data;
      })).toPromise();
  }

  // Obtener detalles de pedido a partir de id de pedido
  newDetallePedido(detalle: IPedidosDetalles) {
    return this.httpClient.post(this.mUrl + this.mService + '/detalles', detalle).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }
}
