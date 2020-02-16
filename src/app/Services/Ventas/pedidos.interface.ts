export interface IPedidosRs {
    size: number;
    rows: IPedidos[];
}

export interface IPedidos {
    id: string;
    cliente: string;
    nota?: string;
    entrega: string;
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
            createdAt: '',
            updatedAt: '',
            estado: true
        };
    }
}
