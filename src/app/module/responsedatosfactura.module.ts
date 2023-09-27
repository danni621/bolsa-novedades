export interface ResponseDatosFactura {
    IdentifiacionRp: string;
    NombreRp: string;
    DireccionRp: string;
    CiudadRp: string;
    FechaEmision: string;
    FechaEmisionComunicado: string;
    FormaPago: string;
    DetalleFactura: string;
    Valor: number;
    TipoPropiedad: number;
    IdCentroServicio: number;
    CorreoRp: string;
    ResGrandesContribu: string;
    ResIvaCree: string;
    LicMinTic: string;
    valorLetras: string;
    DireccionCS: string;
    ValorActual: ResponsePrefijo;
    CorreoCsMensajero: string;

}

export interface ResponsePrefijo {
    ValorActual: string
}