import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { HtmlService } from '../components/html/html.module';
import { PdfService } from '../components/pdf/pdfservice.module';


@Injectable({
    providedIn: 'root'
})
export class Functions {

    constructor(private html: HtmlService, private pdfService: PdfService) { }

    PopUpAprobar(html: any) {
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
                this.PopUpVerFactura(this.html.VerFacturaPos(data));
            }
        });
    }


    PopUpRechazar(html: any) {
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

    PopUpVerFactura(html: any) {
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

    PopUpAlert(title: any, icon: any, text: any, allowOutsideClick: boolean = false, loading: boolean = false) {

        Swal.fire({
            allowOutsideClick: allowOutsideClick,
            title: title,
            icon: icon,
            text: text
        });

        if (loading)
            Swal.showLoading();

    }
}