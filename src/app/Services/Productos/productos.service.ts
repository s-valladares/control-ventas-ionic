import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Config } from '../Config/config';
import { IProductos } from './productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private mUrl = Config.url;
  private mService = 'productos';

  constructor(
    private httpClient: HttpClient,
  ) { }

  /***
  * Obtener listado de productos
  */
  getAll() {
    return this.httpClient.get(this.mUrl + this.mService).pipe(
      map((data: IProductos[]) => {
        return data;
      })).toPromise();
  }
}
