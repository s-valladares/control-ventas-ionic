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
