
export interface IProductosRs {
    size: number;
    rows: IProductos[];
}

export interface IProductos {
    id: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    tipo: IProductosTipos;
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
            tipo: null,
            createdAt: '',
            updatedAt: '',
            estado: true
        };
    }
}


export interface IProductosTiposRs {
    size: number;
    rows: IProductosTipos[];
}

export interface IProductosTipos {
    id: string;
    nombre: string;
}

export class ProductosTipos {
    static empty() {
        return {
            id: '',
            nombre: '',
        };
    }
}
