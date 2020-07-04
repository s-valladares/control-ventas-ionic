
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
