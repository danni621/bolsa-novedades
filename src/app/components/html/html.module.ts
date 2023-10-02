import { Injectable, Input } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class HtmlService {

    constructor() { }

    AprobarHtml(guia: any) {
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
            '<span class="text-line p-1">¡Liquidación Aprobada!</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted-2">' +
            '<span class="text-line p-1">La guía con número "' + guia.guia + '" se ha aprobado' +
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

    RechazarHtml(guia: any) {
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
            '<span class="text-line p-1">La guía con número "' + guia.guia + '" ha sido rechazada, se enviara ' +
            'la ' +
            'notificación a los canales correspondientes</span>' +
            '</p>' +
            '</div>' +
            '</div>';

        return html;
    }

    BuscarHtml(guia: any, guiaBuscar: any) {
        const html = '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<img src="././assets/img/guía_sin_auditoria.svg">' +
            '</div>' +
            '</div>' +
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted">' +
            '<span class="text-line p-1">¿Desea continuar con la busqueda de la guía digitada:' +
            ' ' + guiaBuscar + '?</span>' +
            '</p>' +
            '</div>' +
            '</div>' +
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted">' +
            '<span class="text-line p-1">Recuerda que se liberara la guía que estás gestionando:' +
            ' ' + guia.guia + '</span>' +
            '</p>' +
            '</div>' +
            '</div>';

        return html;
    }

    InfoHtml(info: any, image: any) {
        const html = '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<img src="././assets/img/' + image + '" alt="" class="img-fluid card-img-center rounded-start' +
            'style="width: 120px;">' +
            '</div>' +
            '</div>' +
            '<div class="row custom-row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<p class="text-muted-2">' +
            '<span class="text-line p-1">' + info + '</span>' +
            '</p>' +
            '</div>' +
            '</div>';
        return html;
    }
}