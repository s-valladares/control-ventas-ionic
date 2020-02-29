import { IVentasSemana, VentasSemana } from '../Ventas/ventas.interface';

export interface IEgresosRs {
    size: number;
    rows: IEgresos[];
}

export interface IEgresos {
    id: string;
    nombre: string;
    descripcion?: string;
    fechaGasto: Date;
    ventaSemana: IVentasSemana;
    total: number;
    createdAt?: string;
    updatedAt?: string;
}

export class Egresos {
    static empty() {
        return {
            id: '',
            nombre: '',
            descripcion: '',
            fechaGasto: new Date(),
            ventaSemana: VentasSemana.empty(),
            total: 0,
            createdAt: '',
            updatedAt: ''
        };
    }
}
