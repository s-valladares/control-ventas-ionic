import { IProductos, Productos } from '../Productos/productos.interface';

export interface IPedidosRs {
    size: number;
    rows: IPedidos[];
}

export interface IPedidos {
    id: string;
    cliente: string;
    nota?: string;
    entrega: string;
    hora: string;
    createdAt?: string;
    updatedAt?: string;
    estado: boolean;
}

export class Pedidos {
    static empty() {
        return {
            id: '',
            cliente: '',
            nota: '',
            entrega: '',
            hora: '',
            createdAt: '',
            updatedAt: '',
            estado: true
        };
    }
}

export interface IPedidosDetallesRs {
    size: number;
    rows: IPedidosDetalles[];
}

export interface IPedidosDetalles {
    id: string;
    cantidad: number;
    total?: number;
    producto: IProductos;
    pedido: IPedidos;
}

export class PedidosDetalles {
    static empty() {
        return {
            id: '',
            cantidad: 0,
            total: 0,
            producto: Productos.empty(),
            pedido: Pedidos.empty(),
        };
    }
}
