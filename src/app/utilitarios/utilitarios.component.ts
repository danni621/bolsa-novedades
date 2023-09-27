import { Injectable } from '@angular/core';
import { GuiaModule } from '../module/guia.module';
import { Notificacion, DetalleAdjunto } from '../module/notificacion.module';



@Injectable({
    providedIn: 'root'
})


export class Utilitarios {
    guia = new GuiaModule();

    CargarInfoEncabezado(res: any) {

        this.guia.guia = res.GuiaGestionar;
        this.guia.guiasiguiente = res.SiguienteGuia;
        this.guia.cantidadguias = res.PendientePorGestionar;

        return this.guia;
    }

    CargarInfoGuia(res: any) {

        this.guia.origen = res.NombreCiudadOrigenSistema;
        this.guia.destino = res.NombreCiudadDestinoSistema;
        this.guia.fechaadmision = res.FechaAdmisionSistema;
        this.guia.peso_envio = res.PesoSistema;
        this.guia.volumen_envio = res.PesoVolumetricoSistema;
        this.guia.largo_envio = res.LargoSistema;
        this.guia.ancho_envio = res.AnchoSistema;
        this.guia.alto_envio = res.AltoSistema;
        this.guia.valorcomercial_envio = res.ValorComercialSistema;
        this.guia.valortotal_envio = res.ValorTotalSistema;
        this.guia.fechaAuditoria = res.FechaAuditoria;
        this.guia.peso_auditoria = res.PesoBasculaAuditoria;
        this.guia.volumen_auditoria = res.PesoEsVolumetricoAuditoria;
        this.guia.largo_auditoria = res.LargoAuditoria;
        this.guia.ancho_auditoria = res.AnchoAuditoria;
        this.guia.alto_auditoria = res.AltoAuditoria;
        this.guia.diferencia_peso = res.DiferenciaPesos;
        this.guia.auditor = res.NombreAuditor;
        this.guia.idCentroServicio = res.IdCentroServicioOrigen;
        this.guia.observacion = res.Observaciones;
        this.guia.valortotal_auditoria = res.ValorLiquidacionAuditoria;
        this.guia.valorajuste = res.ValorDiferenciaLiquidacion;
        this.guia.idCentroServicioMensajero = res.IdCentroServicioMensajero

        return this.guia;
    }

    CrearNotificacion(estado: any, imagenes: any, guia: any, datosFacturaPos: any, facturapos: any = "", comunicado: any = "") {

        let detalleimagen: DetalleAdjunto[] = [];

        detalleimagen.push({
            Archivo: comunicado,
            NombreArchivo: 'ComunicadoIntero',
            ExtensionArchivo: 'PDF'
        });

        detalleimagen.push({
            Archivo: facturapos,
            NombreArchivo: 'Factura',
            ExtensionArchivo: 'PDF'
        });

        let z = 1;
        for (let i = 0; i < imagenes.length; i++) {
            detalleimagen.push({
                Archivo: imagenes[i]['Archivo'],
                NombreArchivo: 'Imagen' + z,
                ExtensionArchivo: imagenes[i]['Tipo']
            });
            z++;
        }

        let datanotifica: Notificacion = {
            EstadoAuditoria: estado,
            ListAdjuntos: detalleimagen,
            EmailCentroDeOrigen: ((datosFacturaPos.CorreoRp == '' || datosFacturaPos.CorreoRp == null) ? 'analistacalidad.funcional@interrapidisimo.com' : datosFacturaPos.CorreoRp),
            EmailCentroDeDestinoAuditor: ((datosFacturaPos.CorreoCsMensajero == '' || datosFacturaPos.CorreoCsMensajero == null) ? 'analistacalidad.funcional@interrapidisimo.com' : datosFacturaPos.CorreoCsMensajero),
            NumeroGuia: parseInt(guia.guia)
        }

        return datanotifica;

    }

}