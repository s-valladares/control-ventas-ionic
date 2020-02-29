import { Injectable } from '@angular/core';
import { IVentasRs} from '../interfaces.index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config } from '../Config/config';

@Injectable({
    providedIn: 'root'
})
export class ReportesService {

    private mUrl = Config.url;
    private mService = 'ventas';

    constructor(
        private httpClient: HttpClient,
    ) { }

    // Ver todas las ventas por cada semana
    getVentasPorSemana(id) {
        return this.httpClient.get(this.mUrl + this.mService + '/semana/' + id).pipe(
            map((data: IVentasRs) => {
                return data;
            })).toPromise();
    }
}


