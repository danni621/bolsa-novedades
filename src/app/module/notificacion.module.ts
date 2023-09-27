import { EstadosGuia } from '../enums/enums';

export interface Notificacion {
    EstadoAuditoria: EstadosGuia;
    ListAdjuntos?: DetalleAdjunto[];
    EmailCentroDeOrigen?: string;
    EmailCentroDeDestinoAuditor?: string;
    NumeroGuia: number;
}

export interface DetalleAdjunto {
    Archivo?: string;
    NombreArchivo?: string;
    ExtensionArchivo?: string;
}