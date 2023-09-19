import { EstadosGuia } from '../enums/enums';

export interface ResultadoAuditoria {
    resultado: EstadosGuia;
    afectacionCaja?: AfectacionCaja;
    observacion?: string;
}

export interface AfectacionCaja {
    centroServicio: number;
    valorAjuste: number;
    numeroGuia: number;
    creadoPor?: string;
}
