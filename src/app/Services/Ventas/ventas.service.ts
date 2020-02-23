import { Injectable } from '@angular/core';
import { IVentas } from './ventas.interface';
import { Config } from '../Config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private mUrl = Config.url;
  private mService = 'ventas';

  constructor(
    private httpClient: HttpClient,
  ) { }


  // Crear Venta
  create(obj: IVentas) {
    return this.httpClient.post(this.mUrl + this.mService, obj).pipe(
      map((data: any) => {
        return data;
      })).toPromise();
  }
}
