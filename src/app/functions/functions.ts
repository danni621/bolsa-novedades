import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { HtmlService } from '../components/html/html.module';
import { PdfService } from '../components/pdf/pdfservice.module';
import { environment } from 'src/environments/environment';
import { Service } from '../services/services';
import { CambiosEstadoLiquidacionModule } from '../module/cambiostestadoliq.module';

declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class Functions {

    constructor(private html: HtmlService,
        private pdfService: PdfService,
        private service: Service) { }

    PopUpAprobar(html: any, guia: any) {
        Swal.fire({
            allowOutsideClick: false,
            html: html,
            confirmButtonText: 'Ver Factura',
            customClass: {
                confirmButton: 'my-custom-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const data = this.pdfService.GenerarFactura();
                this.PopUpvVerEnviarFactura(this.html.VerFacturaPos(data));
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
                alert('Enviar Correo');
            }
        });
    }

    PopUpvVerEnviarFactura(html: any) {
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
                alert('Enviar correo');
            }
        });
    }

    PopUpBuscar(html: any, guia: any, guiaBuscar: any) {
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
                localStorage.setItem("GuiaLiberar", guia.guia);
                localStorage.setItem("GuiaBuscar", guiaBuscar);
                window.location.href = '/bolsanovedades';
            } else {
                $("#inputGuia").val(guia.guia);
            }
        });

    }

    PopUpAlert(title: any, icon: any, text: any, allowOutsideClick: boolean = false, loading: boolean = false, confirm: boolean = false) {

        Swal.fire({
            allowOutsideClick: allowOutsideClick,
            title: title,
            icon: icon,
            text: text,
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'my-custom-button-class',
            },
        }).then(resp => {
            if (resp.isConfirmed && confirm)
                window.location.href = environment.urlLogin;
        });

        if (loading)
            Swal.showLoading();

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
            if (resp.isConfirmed)
                if (localStorage.getItem("GuiaPorAuditar") != null && localStorage.getItem("GuiaPorAuditar") != "") {
                    let estado: CambiosEstadoLiquidacionModule = {
                        NumeroGuia: parseInt(localStorage.getItem("GuiaPorAuditar") ?? '0'),
                        IdTipoNovedad: 1,
                        IdEstadoNovedad: 1,
                        CreadoPor: localStorage.getItem('nombreusuario') ?? 'SISTEMA'
                    }

                    this.service.ConsumoServicio('CambiarEstadoLiquidacion', estado).subscribe({
                        next: (res) => {
                            console.log(res);
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });
                }
            this.removeItemsToken();
            window.location.href = environment.urlLogin;
        });

    }

    removeItemsToken() {
        localStorage.clear();
    }

}