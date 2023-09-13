import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { HtmlService } from '../components/html/html.module';
import { PdfService } from '../components/pdf/pdfservice.module';
import { environment } from 'src/environments/environment';

declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class Functions {

    constructor(private html: HtmlService, private pdfService: PdfService) { }

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

    PopUpBuscar(html: any, guia: any, guiaLiberada: any) {
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
                alert('Consumir busqueda');
            } else {
                $("#inputGuia").val(guia.guia);
            }
        });

    }

    PopUpAlert(title: any, icon: any, text: any, allowOutsideClick: boolean = false, loading: boolean = false) {

        Swal.fire({
            allowOutsideClick: allowOutsideClick,
            title: title,
            icon: icon,
            text: text,
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'my-custom-button-class',
            }
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
                window.location.href = environment.urlLogin;
        });

    }
}