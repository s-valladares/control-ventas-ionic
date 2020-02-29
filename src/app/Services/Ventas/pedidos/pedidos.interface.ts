import { IProductos, Productos } from '../../Productos/productos.interface';
import { IVentasSemana, VentasSemana } from '../ventas/ventas.interface';

export interface IPedidosRs {
    size: number;
    rows: IPedidos[];
}

export interface IPedidos {
    id: string;
    ventaSemana: IVentasSemana;
    cliente: string;
    nota?: string;
    entrega: Date;
    hora: string;
    createdAt?: string;
    updatedAt?: string;
    estado: boolean;
}

export class Pedidos {
    static empty() {
        return {
            id: '',
            ventaSemana: VentasSemana.empty(),
            cliente: '',
            nota: '',
            entrega: new Date(),
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
    subtotal: number;
    total?: number;
    producto: IProductos;
    adicional: number;
    comentario: string;
    pedido: IPedidos;
}

export class PedidosDetalles {
    static empty() {
        return {
            id: '',
            cantidad: 0,
            total: 0,
            adicional: 0,
            subtotal: 0,
            comentario: '',
            producto: Productos.empty(),
            pedido: Pedidos.empty(),
        };
    }
}
