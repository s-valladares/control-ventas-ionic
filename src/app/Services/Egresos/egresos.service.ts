import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Config } from '../Config/config';
import { IEgresos, IEgresosRs } from './egresos.interface';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  private mUrl = Config.url;
  private mService = 'egresos';

  constructor(
    private httpClient: HttpClient,
  ) { }

  // Obtener listado de egresos
  getAll() {
    return this.httpClient.get(this.mUrl + this.mService).pipe(
      map((data: IEgresosRs) => {
        return data;
      })).toPromise();
  }


  // Obtener producto por id
  getId(id: string) {
    return this.httpClient.get(this.mUrl + this.mService + '/' + id).pipe(
      map((data: IEgresos) => {
        return data;
      })).toPromise();
  }

  // Actualizar producto
  update(id: string, obj: IEgresos) {
    return this.httpClient.put(this.mUrl + this.mService + '/' + id, obj).pipe(
      map((data: IEgresos) => {
        return data;
      })).toPromise();
  }

  // Crear producto
  create(obj: IEgresos) {
    return this.httpClient.post(this.mUrl + this.mService, obj).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }

  // Eliminar producto
  delete(pKey: string) {
    return this.httpClient.delete(this.mUrl + this.mService + '/' + pKey)
      // tslint:disable-next-line: arrow-return-shorthand
      .pipe(map((data: any) => { return data; }))
      .toPromise();
  }
}
