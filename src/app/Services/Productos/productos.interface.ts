
export interface IProductosRs {
    size: number;
    rows: IProductos[];
}

export interface IProductos {
    id: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    tipo: string;
    createdAt?: string;
    updatedAt?: string;
    estado: boolean;
}

export class Productos {
    static empty() {
        return {
            id: '',
            nombre: '',
            descripcion: '',
            precio: 0,
            tipo: '',
            createdAt: '',
            updatedAt: '',
            estado: true
        }
    }
}