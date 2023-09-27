import { EstadosGuia } from '../enums/enums';

export interface ResultadoAuditoria {
    Resultado: EstadosGuia;
    AfectacionCaja?: AfectacionCaja;
    Observacion?: string;
}

export interface AfectacionCaja {
    CentroServicio: number;
    ValorAjuste: number;
    NumeroGuia: number;
    creadoPor?: string;
    CentroServicioMensajero?: number;
}
