import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class HtmlService {

    constructor() { }

    AprobarHtml() {
        const html =
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<img src="././assets/img/noti-4.svg" alt="" class="img-fluid card-img-center rounded-start' +
            'style="width: 120px;">' +
            '</div>' +
            '</div>' +
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted">' +
            '<span class="text-line p-1">¡Liquidación Aprobrada!</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted-2">' +
            '<span class="text-line p-1">La guía con número "70005238269" se ha aprobado' +
            ' exitosamente.</span>' +
            '</p>' +
            '</div>' +
            '</div>';

        return html;
    }

    VerFacturaPos(data: any) {
        const html = ' <div class="modal-pdf-dialog modal-content modal-pdf">' +
            '<div class="row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<div class="div-postion"></div>' +
            '<embed class="modal-pdf-dialog" id="pdfViewer" title="" src="' + data + '#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="600px" />' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-6 col-lg-12 text-left">' +
            '<p class="text-muted">' +
            '<span class="text-line p-2">*Se generara la notificación al dar en "Enviar" se enviara al' +
            ' canal de' +
            ' venta, posterior podrás continuar con la siguiente guía</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    }

    RechazarHtml() {
        const html = '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<img src="././assets/img/guia_rechazada.svg" alt="">' +
            '</div>' +
            '</div>' +
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted">' +
            '<span class="text-line p-1">¡Guía Rechazada!</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted-2">' +
            '<span class="text-line p-1">La guía con número "70005238269" ha sido rechazada, se enviara ' +
            'la ' +
            'notificación a los canales correspondientes</span>' +
            '</p>' +
            '</div>' +
            '</div>';

        return html;
    }
}