
export interface IEgresosRs {
    size: number;
    rows: IEgresos[];
}

export interface IEgresos {
    id: string;
    nombre: string;
    descripcion?: string;
    fechaGasto: Date;
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
            total: 0,
            createdAt: '',
            updatedAt: ''
        };
    }
}
