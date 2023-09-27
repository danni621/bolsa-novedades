import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { HtmlService } from '../components/html/html.module';
import { PdfService } from '../components/pdf/pdfservice.module';
import { Utilitarios } from '../utilitarios/utilitarios.component';
import { environment } from 'src/environments/environment';
import { Service } from '../services/services';
import { CambiosEstadoLiquidacionModule } from '../module/cambiostestadoliq.module';
import { EstadosGuia } from '../enums/enums';
import { RespuestaCargarImagenes } from '../module/respuestacargarimagenes.module';

declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class Functions {

    token: any = "";
    imagenes: RespuestaCargarImagenes[] = [];

    constructor(private html: HtmlService,
        private pdfService: PdfService,
        private service: Service,
        private utilitarios: Utilitarios) { }

    async PopUpAprobar(html: any, guia: any, datafactura: any) {

        Swal.fire({
            allowOutsideClick: false,
            html: html,
            confirmButtonText: 'Ver Factura',
            customClass: {
                confirmButton: 'my-custom-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#loader').removeClass('hide');
                this.service.ConsumoServicio('cargarimagenes', guia.guia).then(res => {
                    this.imagenes = res;

                    let facturapos = this.pdfService.GenerarFactura(datafactura);
                    let generarcomunicado = this.pdfService.GenerarComunicadoInterno(guia, datafactura, this.imagenes);
                    let arraypos = facturapos.split(',');
                    let arraycomunicado = generarcomunicado.split(',');
                    let notificacion = this.utilitarios.CrearNotificacion(EstadosGuia.Aprobado, this.imagenes, guia, datafactura, arraypos[1], arraycomunicado[1]);

                    $('#loader').addClass('hide');
                    this.PopUpvVerEnviarFactura(this.html.VerFacturaPos(facturapos), notificacion);
                }).catch(err => {
                    console.log(err, 'Error - Consumo servicio Imagenenes Aprobacion');
                });
            }
        });
    }


    PopUpRechazar(html: any, guia: any) {
        Swal.fire({
            allowOutsideClick: false,
            html: html,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'my-custom-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/bolsanovedades';
            }
        });
    }

    PopUpvVerEnviarFactura(html: any, notificacion: any) {
        Swal.fire({
            allowOutsideClick: false,
            html: html,
            confirmButtonText: 'Enviar',
            customClass: {
                confirmButton: 'my-custom-button-class',
                container: 'mi-clase-personal'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $('#loader').removeClass('hide');
                this.service.ConsumoServicio('enviarcorreo', notificacion).then(res => {
                    $('#loader').addClass('hide');
                    this.PopUpAlert('', 'success', res, false, false, true);
                }).catch(err => {
                    $('#loader').addClass('hide');
                    this.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
                });
            }
        });
    }

    PopUpBuscar(html: any,
        guia: any,
        guiaBuscar: any) {

        Swal.fire({
            allowOutsideClick: false,
            html: html,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Continuar',
            customClass: {
                confirmButton: 'my-custom-button-class',
                cancelButton: 'button-info-3'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                this.service.ConsumoServicio('consultarinfoliquidacion', guiaBuscar).then(res => {
                    localStorage.removeItem("GuiaPorAuditar");
                    localStorage.setItem("GuiaLiberar", guia.guia);
                    localStorage.setItem("GuiaBuscar", guiaBuscar);
                    window.location.href = '/bolsanovedades';
                }).catch(err => {
                    let image: string = "";
                    switch (err.error) {
                        case "La guía no cuenta con auditoría pendiente para gestionar":
                            image = 'guía_sin_auditoria.svg';
                            break;
                        case "La guía ya cuenta con auditoria gestionada":
                            image = 'guia_auditada.svg';
                            break;
                        case "La guía esta siendo gestionada por otro usuario":
                            image = 'guía_sin_auditoria.svg';
                            break;
                    }
                    this.PopUpInfo(this.html.InfoHtml(err.error, image), guia.guia);
                });
            } else {
                $("#inputGuia").val(guia.guia);
            }
        });

    }

    PopUpAlert(title: any,
        icon: any, text: any,
        allowOutsideClick: boolean = false,
        loading: boolean = false,
        confirm: boolean = false) {

        Swal.fire({
            allowOutsideClick: allowOutsideClick,
            title: title,
            icon: icon,
            text: text,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'my-custom-button-class',
            },
        }).then(resp => {
            if (resp.isConfirmed && confirm) {
                window.location.href = '/bolsanovedades';
            }
        });

        if (loading)
            Swal.showLoading();

    }


    PopUpInfo(html: any, guia: any) {
        console.log(guia, ' guia - a volver a gestionar');
        Swal.fire({
            allowOutsideClick: false,
            html: html,
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'my-custom-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $("#inputGuia").val(guia);
                $('#loader').addClass('hide');
            }
        });
    }


    SesionCaducada() {
        Swal.fire({
            title: "Sesión Caducada",
            text: "Por favor autenticarse nuevamente",
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
        }).then(resp => {
            if (resp.isConfirmed) {
                if (localStorage.getItem("GuiaPorAuditar") != null && localStorage.getItem("GuiaPorAuditar") != "") {
                    let estado: CambiosEstadoLiquidacionModule = {
                        NumeroGuia: parseInt(localStorage.getItem("GuiaPorAuditar") ?? '0'),
                        IdTipoNovedad: 1,
                        IdEstadoNovedad: EstadosGuia.PorAuditor,
                        CreadoPor: localStorage.getItem('nombreusuario') ?? 'SISTEMA'
                    }
                    this.service.ConsumoServicio('CambiarEstadoLiquidacion', estado).then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    });
                }
                this.removeItemsToken();
                window.location.href = environment.urlLogin;
            }
        });

    }

    removeItemsToken() {
        localStorage.clear();
    }



}