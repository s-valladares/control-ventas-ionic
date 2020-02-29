import { IPedidos, Pedidos } from '../pedidos/pedidos.interface';

export interface IVentasRs {
    size: number;
    rows: IVentas[];
}

export interface IVentas {
    id: string;
    total: number;
    pedido: IPedidos;
    createdAt?: string;
    updatedAt?: string;
}

export class Ventas {
    static empty() {
        return {
            id: '',
            total: 0,
            pedido: Pedidos.empty()
        };
    }
}

export interface IVentasSemanaRs {
    size: number;
    rows: IVentasSemana[];
}

export interface IVentasSemana {
    id: string;
    fechaInicio: string;
}

export class VentasSemana {
    static empty() {
        return {
            id: '',
            fechaInicio: ''
        };
    }
}
