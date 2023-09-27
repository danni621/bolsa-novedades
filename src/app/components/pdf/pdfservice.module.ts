import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import * as JsBarcode from 'jsbarcode';

// @ts-ignore
import { font } from "../../../assets/font/leelawui/leelawad-normal";
// @ts-ignore
import { fontbold } from "../../../assets/font/leelawui/leelawdb-normal";

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    constructor() { }

    GenerarFactura(datafactura: any) {

        const doc = new jsPDF({
            orientation: "landscape",
        });

        let x: number = 10;
        let y: number = 10;

        doc.addFileToVFS('leelawad-normal.ttf', font);
        doc.addFont('leelawad-normal.ttf', 'leelawad', 'normal');
        /*Normal*/
        doc.setFont("leelawad");

        doc.addFileToVFS('leelawdb-normal.ttf', fontbold);
        doc.addFont('leelawdb-normal.ttf', 'leelawdb', 'normal');
        /*Negrilla*/
        doc.setFont('leelawdb');

        const barcodeImage = this.generateQRCode(datafactura.ValorActual.ValorActual || '');

        doc.setFontSize(12);

        doc.addImage('../../assets/img/interrapidisimo.jpg', 'JPEG', x, y, 60, 30);
        doc.addImage(barcodeImage, 'PNG', x + 212, y + 2, 60, 18);
        doc.setFontSize(12);
        doc.setFont('leelawdb');
        doc.text(datafactura.ValorActual.ValorActual || '', x + 240, y + 23);

        let arraycontri = '';
        let cadenacontri = '';

        if (datafactura.ResGrandesContribu != null && datafactura.ResGrandesContribu != "") {
            arraycontri = datafactura.ResGrandesContribu.split(' ') || '';
            cadenacontri = `${arraycontri[0]} ${arraycontri[1]} ${arraycontri[2]} ${arraycontri[3]} ${arraycontri[4]} ${arraycontri[5]} `;
        }

        let arrayresiva = '';
        let cadenaresiva = '';

        if (datafactura.ResIvaCree != null && datafactura.ResIvaCree != "") {
            arrayresiva = datafactura.ResIvaCree.split(' ') || '';
            cadenaresiva = `${arrayresiva[1]} ${arrayresiva[2]} ${arrayresiva[3]} ${arraycontri[4]} ${arraycontri[5]} `;
        }


        doc.setFontSize(8);
        doc.setFont('leelawdb');
        doc.text('Régimen Común, Grandes Contribuyentes', x + 60, y + 4);
        doc.text('Res. ' + cadenacontri, x + 63, y + 8);
        doc.text(arraycontri[6] + ' , Retenedores de IVA y' || '', x + 68, y + 12);
        doc.text('Autorretenedores de Renta Res. ' + arrayresiva[0], x + 60, y + 16);
        doc.text(cadenaresiva + '. Licencia' || '', x + 63, y + 20);
        doc.text(datafactura.LicMinTic || '', x + 75, y + 24);

        doc.addImage('../../assets/img/normas.jpg', 'JPEG', x + 120, y + 2, 32, 23);

        doc.setFontSize(12);
        doc.text('FACTURA DE VENTA No.', x + 152, y + 13);

        doc.text('INTER RAPIDISIMO S.A. NIT: 800.251.569-7', x + 2, y + 38);
        doc.setFontSize(10);
        doc.text('Resolución DIAN No. 187620055264437 de 03/11/2017 facturación por computador desde el número 5001 al 10000 autorizada', x + 2, y + 43);
        doc.text('GEF-FAC-R.23', x + 250, y + 44);


        /* Inicio informacion del cliente*/
        doc.rect(x + 2, y + 45, 138, 20);
        doc.rect(x + 140, y + 45, 138, 20);
        doc.setFontSize(12);
        doc.text('IDENTIFICACION:', x + 3, y + 50);
        doc.text('CLIENTE:', x + 3, y + 62);
        doc.text('DIRECCIÓN:', x + 142, y + 50);

        doc.setFont("leelawad");
        doc.text(datafactura.IdentifiacionRp || '', x + 60, y + 50);
        doc.text(datafactura.NombreRp || '', x + 45, y + 62);
        doc.text(datafactura.DireccionRp || '', x + 185, y + 56);
        /* Fin informacion del cliente*/

        /* Inicio informacion ciudad y fecha*/
        doc.rect(x + 2, y + 65, 69, 20);
        doc.rect(x + 71, y + 65, 69, 20);
        doc.rect(x + 140, y + 65, 69, 20);
        doc.rect(x + 209, y + 65, 69, 20);
        doc.setFontSize(12);
        doc.setFont('leelawdb');
        doc.text('CIUDAD:', x + 3, y + 70);
        doc.text('FECHA DE EMISIÓN:', x + 83, y + 70);
        doc.text('FECHA DE VENCIMIENTO:', x + 146, y + 70);
        doc.text('FORMA DE PAGO:', x + 225, y + 70);

        doc.setFont("leelawad");
        doc.text(datafactura.CiudadRp || '', x + 25, y + 76);
        doc.text(datafactura.FechaEmision || '', x + 82, y + 76);
        doc.text(datafactura.FechaEmision || '', x + 152, y + 76);
        doc.text(datafactura.FormaPago || '', x + 231, y + 76);

        /* Fin informacion ciudad y fecha*/

        /* Inicio cuerpo factura*/
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(211, 211, 211);
        doc.rect(x + 2, y + 85, 34.5, 10, 'FD');
        doc.rect(x + 36.5, y + 85, 207, 10, 'FD');
        doc.rect(x + 243.5, y + 85, 34.5, 10, 'FD');
        doc.setFontSize(12);
        doc.setFont('leelawdb');
        doc.text('CANTIDAD', x + 8, y + 91);
        doc.text('DETALLE', x + 127, y + 91);
        doc.text('VALOR', x + 253, y + 91);

        doc.rect(x + 2, y + 95, 276, 40);
        doc.setFontSize(18);
        doc.setFont('leelawdb');
        doc.text('1', x + 18, y + 115);
        doc.setFont('Arial', 'semibold');
        doc.text(datafactura.DetalleFactura || '', x + 65, y + 115);
        doc.text('$ ' + datafactura.Valor || '', x + 245, y + 115);
        doc.setFontSize(12);
        /* Fin cuerpo factura*/

        /* Inicio Fecha de recibo y subtotal, descuento etc*/
        doc.setFont('leelawdb');
        doc.cell(x + 2, y + 135, 125, 8, 'FECHA DE RECIBIDO:', 0, 'center');
        doc.cell(x + 2, y + 143, 125, 8, 'NOMBRE QUIEN RECIBE:', 1, 'center');
        doc.cell(x + 2, y + 151, 125, 8, 'IDENTIFICACION:', 0, 'center');
        doc.cell(x + 2, y + 159, 125, 8, 'VALOR LETRAS:', 1, 'center');
        doc.setFontSize(10);
        doc.setFont('Arial', 'semibold');
        doc.text(datafactura.valorLetras + ' M/CTE' || '', x + 37.5, y + 165.5);
        /* Fin Fecha de recibo y subtotal, descuento etc*/

        /*Firma y sello*/
        doc.setFontSize(12);
        doc.rect(x + 127, y + 135, 80, 32);
        doc.line(x + 142, y + 156, x + 192, y + 156);
        doc.text('FIRMA / SELLO DEL PUNTO', x + 140, y + 163);

        /*Fin de Firma y sello*/

        /*Subtotales y totales */
        doc.setDrawColor(211, 211, 211);
        doc.setFillColor(211, 211, 211);
        doc.rect(x + 207, y + 135, 30, 8, 'FD');
        doc.rect(x + 207, y + 143, 30, 8, 'FD');
        doc.rect(x + 207, y + 151, 30, 8, 'FD');
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(0, 0, 0);
        doc.rect(x + 207, y + 159, 30, 8, 'FD');

        doc.setDrawColor(0, 0, 0);
        doc.rect(x + 207, y + 135, 30, 32);
        doc.rect(x + 237, y + 135, 41, 8);
        doc.rect(x + 237, y + 143, 41, 8);
        doc.rect(x + 237, y + 151, 41, 8);
        doc.rect(x + 237, y + 159, 41, 8);


        doc.setFontSize(12);
        doc.setFont('leelawdb');
        doc.text('SUBTOTAL:', x + 210, y + 140);
        doc.text('DESCUENTO:', x + 208, y + 148);
        doc.text('IVA:', x + 218, y + 156);
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL:', x + 215, y + 164);
        doc.setTextColor(0, 0, 0);
        doc.setFont("leelawad");
        doc.text('$ ' + datafactura.Valor || '', x + 247, y + 140);
        doc.text('', x + 247, y + 148);
        doc.text('', x + 247, y + 156);
        doc.text('$ ' + datafactura.Valor || '', x + 247, y + 164);
        /*Fin Subtotales y totales */

        /**Inicio Footer*/
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(0, 0, 0);
        doc.rect(x + 2, y + 167, 205, 8, 'FD');
        doc.setFont('Arial', 'semibold');
        doc.setTextColor(255, 255, 255);
        doc.text('Bogotá D.C CRA 30 7-45 - 560 5000 FAX: 562 500 interrapidisimo.com', x + 45, y + 173);
        doc.setTextColor(0, 0, 0);
        doc.setFont('leelawdb');
        doc.text('CLIENTE', x + 254, y + 173);
        /**FIn Footer*/

        //window.open(doc.output('bloburl'), '_blank');

        return doc.output('datauristring');

    }

    generateQRCode(idFacturapos: any) {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, idFacturapos, {
            format: 'CODE128',
            width: 1,
            height: 50,
            displayValue: false,
        });

        return canvas.toDataURL('image/png');
    }

    GenerarComunicadoInterno(dataguia: any, datafactura: any, imagenes: any) {

        const doc = new jsPDF({
            orientation: "portrait",
        });

        let x: number = 10;
        let y: number = 10;


        doc.addFileToVFS('leelawad-normal.ttf', font);
        doc.addFont('leelawad-normal.ttf', 'leelawad', 'normal');
        /*Normal*/
        doc.setFont("leelawad");

        doc.addFileToVFS('leelawdb-normal.ttf', fontbold);
        doc.addFont('leelawdb-normal.ttf', 'leelawdb', 'normal');
        /*Negrilla*/
        doc.setFont('leelawdb');

        /* Inicio Cabecera */
        doc.addImage('../../assets/img/interrapidisimo.jpg', 'JPEG', x - 1, y + 7.5, 55, 20);
        doc.rect(x, y, 55, 24);
        doc.rect(x + 55, y, 90, 12);
        doc.rect(x + 55, y + 12, 90, 12);
        doc.rect(x + 145, y, 45, 8);
        doc.rect(x + 145, y + 8, 45, 8);
        doc.rect(x + 145, y + 16, 45, 8);

        doc.setFontSize(8);
        doc.setFont('leelawdb');
        doc.text('COMUNICADO INTERNO', x + 80, y + 4);
        doc.text('GESTION PLANEACION DIRECTIVA', x + 72, y + 16);

        doc.text('Codigo: GPL-GPL-R-12', x + 151, y + 4);
        doc.text('Vigente desde: 16-01-2014', x + 150, y + 12);
        doc.text('Version: 4', x + 160, y + 20);
        /* Fin Cabecera */

        /* Inicio Fecha, Para, ID , Asunto */
        doc.setFontSize(9);
        doc.setFont('leelawdb');
        doc.text('FECHA:', x, y + 38);
        doc.text('PARA:', x, y + 45);
        doc.setTextColor(242, 63, 60);
        doc.text('ID:', x, y + 52);
        doc.setTextColor(0, 0, 0);
        doc.text('ASUNTO:', x, y + 59);


        doc.setDrawColor(242, 63, 60);
        doc.setFillColor(242, 63, 60);
        doc.addImage('../../assets/img/certified_mail.jpg', 'JPEG', x + 149, y + 32, 30, 30);
        doc.rect(x + 149, y + 32, 30, 30);
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(0, 0, 0);

        doc.text(datafactura.FechaEmisionComunicado || '', x + 24, y + 38);
        doc.text(datafactura.NombreRp || '', x + 24, y + 45);
        doc.setTextColor(242, 63, 60);
        doc.text(datafactura.IdCentroServicio + ' - ' + datafactura.DireccionCS + ' ID ' + datafactura.IdCentroServicio || '', x + 24, y + 52);
        doc.setTextColor(0, 0, 0);
        doc.text('NOVEDAD EN LIQUIDACIÓN DE ENVÍOS', x + 24, y + 59);
        /* Inicio Fecha, Para, ID , Asunto */


        let arrayco = '';
        let cadena = '';
        if (datafactura.FechaEmisionComunicado != null && datafactura.FechaEmisionComunicado != '') {
            arrayco = datafactura.FechaEmisionComunicado.split(' ') || '';
            cadena = `${arrayco[1]} ${arrayco[2]} ${arrayco[3]} ${arrayco[4]} ${arrayco[5]}`;
        }

        /* Inicio Body */
        doc.setFontSize(9);
        doc.setFont("leelawad");
        doc.text('Cordial Saludo:', x, y + 71);
        doc.text('De acuerdo a la auditoría de peso realizada el día ' + arrayco[0] || '', x, y + 80);

        doc.setTextColor(242, 63, 60);
        doc.text(cadena || '', x + 83, y + 80);
        doc.setTextColor(0, 0, 0);
        doc.setFont("leelawad");
        doc.text('por medio de la', x + 121, y + 80);
        doc.setTextColor(242, 63, 60);
        doc.text('herramienta App', x + 144, y + 80);
        doc.setTextColor(0, 0, 0);
        doc.text('el envío admitido', x + 169, y + 80);

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text('en su canal de venta, se evidenció que', x, y + 85);
        doc.text('relacionado en las facturas de venta', x + 66, y + 85);
        doc.setTextColor(242, 63, 60);
        doc.text('el peso', x + 55, y + 85);
        doc.text(dataguia.guia.toString() || '', x + 118, y + 85);
        doc.setTextColor(0, 0, 0);
        doc.setFont("leelawad");
        doc.text('no corresponden con el peso real del', x + 140, y + 85);


        doc.setFontSize(9);
        doc.text('envío,', x, y + 90);
        doc.setFont("LeelawUI");
        doc.setTextColor(242, 63, 60);
        doc.text('obteniendo', x + 10, y + 90);
        doc.setTextColor(0, 0, 0);
        doc.text('una diferencia de ' + dataguia.diferencia_peso.toString() + ' Kg equivalentes a $ ' + dataguia.valorajuste.toString() + '.' || '', x + 25, y + 90);

        /* Inicio Tabla Auditoria*/
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(220, 224, 242);

        doc.rect(x + 76, y + 104, 96, 6, 'FD');
        doc.setFont('leelawdb');
        doc.setTextColor(0, 0, 0);
        doc.text('Auditoria', x + 118, y + 108);


        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(142, 170, 220);
        doc.rect(x, y + 110, 15, 8, 'FD');
        doc.rect(x + 15, y + 110, 23, 8, 'FD');
        doc.rect(x + 38, y + 110, 17, 8, 'FD');
        doc.rect(x + 55, y + 110, 21, 8, 'FD');
        doc.rect(x + 76, y + 110, 15, 8, 'FD');
        doc.rect(x + 91, y + 110, 15, 8, 'FD');
        doc.rect(x + 106, y + 110, 18, 8, 'FD');
        doc.rect(x + 124, y + 110, 10, 8, 'FD');
        doc.rect(x + 134, y + 110, 10, 8, 'FD');
        doc.rect(x + 144, y + 110, 10, 8, 'FD');
        doc.rect(x + 154, y + 110, 18, 8, 'FD');
        doc.rect(x + 172, y + 110, 18, 8, 'FD');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text('ID', x + 1, y + 115);
        doc.text('GUIA', x + 16, y + 115);
        doc.text('FECHA', x + 39, y + 115);
        doc.text('Valor Envio', x + 56, y + 115);
        doc.text('Peso', x + 76.5, y + 113);
        doc.text('Liquidado', x + 76.5, y + 117);
        doc.text('Peso Real', x + 91.5, y + 115);
        doc.text('Diferencia', x + 106.5, y + 113);
        doc.text('de peso', x + 106.5, y + 117);
        doc.text('Largo', x + 124.5, y + 115);
        doc.text('Alto', x + 135, y + 115);
        doc.text('Ancho', x + 144.5, y + 115);
        doc.text('Valor Real', x + 155, y + 113);
        doc.text('del Envío', x + 155, y + 117);
        doc.text('Valor', x + 173, y + 113);
        doc.text('Diferencia', x + 173, y + 117);



        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(0, 0, 0);
        doc.rect(x, y + 118, 15, 6);
        doc.rect(x + 15, y + 118, 23, 6);
        doc.rect(x + 38, y + 118, 17, 6);
        doc.rect(x + 55, y + 118, 21, 6);
        doc.rect(x + 76, y + 118, 15, 6);
        doc.rect(x + 91, y + 118, 15, 6);
        doc.rect(x + 106, y + 118, 18, 6);
        doc.rect(x + 124, y + 118, 10, 6);
        doc.rect(x + 134, y + 118, 10, 6);
        doc.rect(x + 144, y + 118, 10, 6);
        doc.rect(x + 154, y + 118, 18, 6);
        doc.rect(x + 172, y + 118, 18, 6);
        doc.setTextColor(0, 0, 0);
        doc.setFont("leelawad");
        doc.text(dataguia.idCentroServicio.toString() || '', x + 1, y + 122);
        doc.text(dataguia.guia.toString() || '', x + 16, y + 122);
        doc.text(dataguia.fechaadmision.toString() || '', x + 39, y + 122);
        doc.text('$', x + 56, y + 122);
        doc.text(dataguia.valortotal_envio.toString() || '', x + 64, y + 122);
        doc.text(dataguia.peso_auditoria.toString() || '', x + 77, y + 122);
        doc.text(dataguia.volumen_auditoria.toString() || '', x + 92, y + 122);
        doc.text(dataguia.diferencia_peso.toString() || '', x + 107, y + 122);
        doc.text(dataguia.largo_auditoria.toString() || '', x + 125, y + 122);
        doc.text(dataguia.ancho_auditoria.toString() || '', x + 135, y + 122);
        doc.text(dataguia.alto_auditoria.toString() || '', x + 145, y + 122);
        doc.text('$', x + 155, y + 122);
        doc.text(dataguia.valortotal_auditoria.toString() || '', x + 158, y + 122);
        doc.text('$', x + 173, y + 122);
        doc.text(dataguia.valortotal_envio.toString() || '', x + 176, y + 122);
        /* Fin Tabla Auditoria*/

        /* Inicio Imagenes*/
        let z: number = 10;
        for (let i = 0; i < imagenes.length; i++) {
            let base64ImageData = '';
            switch (imagenes[i]['Tipo']) {
                case "JPEG":
                    base64ImageData = 'data:image/jpeg;base64,' + imagenes[i]['Archivo'];
                    break;
                case "PNG":
                    base64ImageData = 'data:image/png;base64,' + imagenes[i]['Archivo'];
                    break;
            }
            doc.addImage(base64ImageData, imagenes[i]['Tipo'], x + z, y + 130, 30, 40);
            z = z + 45;
        }
        /* Fin Imagenes*/

        doc.setFontSize(9);
        doc.text('Se informa que a partir de la fecha se procederá a cobrar a todos los canales de venta las diferencias entre el peso liquidado y el peso real', x, y + 180);
        doc.text('mediante afectaciones a la caja. Teniendo en cuenta lo anterior se realizará el cobro respectivo afectando la caja del canal de venta a su', x, y + 185);
        doc.text('cargo mediante un ingreso por valor de', x, y + 190);
        doc.setTextColor(242, 63, 60);
        doc.text('$ ' + dataguia.valorajuste.toString() || '', x + 57, y + 190);
        doc.setTextColor(0, 0, 0);
        doc.text('Para mayor información, escríbenos al correo electrónico: subgerente.controldecuentas1@interrapidisimo.com', x, y + 200);
        doc.text('Agradecemos la confianza depositada en la compañía y recuerde que usted es nuestro aliado comercial y parte importante de INTER', x, y + 210);
        doc.text('RAPIDÍSIMO S.A', x, y + 215);
        /* Fin Body */

        /* Inicio Firma y footer*/
        doc.addImage('../../assets/firma/FirmaDigital.PNG', 'PNG', x, y + 220, 50, 20);
        doc.line(x, y + 235, x + 50, y + 235);
        doc.setFont('leelawdb');
        doc.text('INTER RAPIDÍSIMO S.A.', x, y + 245);
        doc.setFont("leelawad");
        doc.setFontSize(7);
        doc.text('EL PRESENTE DOCUMENTO ES PROPIEDAD DE INTER RAPIDÍSIMO. SU UTILIZACIÓN ES EXCLUSIVA Y PRIVILEGIADA PARA EL FUNCIONAMIENTO', x + 10, y + 250);
        doc.text('INTERNO DE LA COMPAÑIA NO DEBE SER REPRODUCIDO TOTAL NI PARCIALMENTE', x + 48, y + 255);
        // /* Fin Firma y footer*/

        //window.open(doc.output('bloburl'), '_blank');

        return doc.output('datauristring');
    }

}
