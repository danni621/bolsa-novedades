import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import * as JsBarcode from 'jsbarcode';

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    constructor() { }

    GenerarFactura() {
        const doc = new jsPDF({
            orientation: "landscape",
        });

        let x: number = 10;
        let y: number = 10;

        const barcodeImage = this.generateQRCode(455);

        doc.setFontSize(12);

        doc.addImage('../../assets/img/interrapidisimo.jpg', 'JPEG', x, y, 60, 30);
        doc.addImage(barcodeImage, 'PNG', x + 212, y + 2, 60, 18);
        doc.setFontSize(12);
        doc.setFont('Arial', 'semibold');
        doc.text('455', x + 240, y + 23);

        doc.setFontSize(9);
        doc.setFont('Arial', 'bold');
        doc.text('Régimen Común, Grandes Contribuyentes', x + 60, y + 4);
        doc.text('Res. 01124515111 de diciembre 24 de', x + 63, y + 8);
        doc.text('2018, Retenedores de IVA y', x + 68, y + 12);
        doc.text('Autorretenedores de Renta Res. 0070074', x + 60, y + 16);
        doc.text('de Septiembre 17 de 2012. Licencia', x + 63, y + 20);
        doc.text('MINTIC 001057', x + 75, y + 24);

        doc.addImage('../../assets/img/normas.jpg', 'JPEG', x + 120, y + 2, 32, 23);

        doc.setFontSize(12);
        doc.text('COMPROBANTE DE VENTA No.', x + 152, y + 13);

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

        doc.setFont('Arial', '');
        doc.text('1023005860', x + 60, y + 50);
        doc.text('LEIDY PAOLA CASALLAS GOMEZ', x + 45, y + 62);
        doc.text('CL 87 B SUR 3 A 21', x + 185, y + 56);
        /* Fin informacion del cliente*/

        /* Inicio informacion ciudad y fecha*/
        doc.rect(x + 2, y + 65, 69, 20);
        doc.rect(x + 71, y + 65, 69, 20);
        doc.rect(x + 140, y + 65, 69, 20);
        doc.rect(x + 209, y + 65, 69, 20);
        doc.setFontSize(12);
        doc.setFont('Arial', 'bold');
        doc.text('CIUDAD:', x + 3, y + 70);
        doc.text('FECHA DE EMISIÓN:', x + 83, y + 70);
        doc.text('FECHA DE VENCIMIENTO:', x + 146, y + 70);
        doc.text('FORMA DE PAGO:', x + 225, y + 70);

        doc.setFont('Arial', '');
        doc.text('BOGOTA', x + 25, y + 76);
        doc.text('03/06/2023 09:40:38 AM', x + 82, y + 76);
        doc.text('03/06/2023 09:40:38 AM', x + 152, y + 76);
        doc.text('CONTADO', x + 231, y + 76);

        /* Fin informacion ciudad y fecha*/

        /* Inicio cuerpo factura*/
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(211, 211, 211);
        doc.rect(x + 2, y + 85, 34.5, 10, 'FD');
        doc.rect(x + 36.5, y + 85, 207, 10, 'FD');
        doc.rect(x + 243.5, y + 85, 34.5, 10, 'FD');
        doc.setFontSize(12);
        doc.setFont('Arial', 'bold');
        doc.text('CANTIDAD', x + 8, y + 91);
        doc.text('DETALLE', x + 127, y + 91);
        doc.text('VALOR', x + 253, y + 91);

        doc.rect(x + 2, y + 95, 276, 40);
        doc.setFontSize(18);
        doc.setFont('Arial', 'bold');
        doc.text('1', x + 18, y + 115);
        doc.setFont('Arial', 'semibold');
        doc.text('Admisión menor valor cobrado Factura N° 700100599087', x + 65, y + 115);
        doc.text('$ 1.000.000,00', x + 236, y + 115);
        doc.setFontSize(12);
        /* Fin cuerpo factura*/

        /* Inicio Fecha de recibo y subtotal, descuento etc*/
        doc.setFont('Arial', 'bold');
        doc.cell(x + 2, y + 135, 125, 8, 'FECHA DE RECIBIDO:', 0, 'center');
        doc.cell(x + 2, y + 143, 125, 8, 'NOMBRE QUIEN RECIBE:', 1, 'center');
        doc.cell(x + 2, y + 151, 125, 8, 'IDENTIFICACION:', 0, 'center');
        doc.cell(x + 2, y + 159, 125, 8, 'VALOR LETRAS:', 1, 'center');
        doc.setFontSize(12);
        doc.setFont('Arial', 'semibold');
        doc.text('CINCO MIL PESOS M/CTE', x + 39.5, y + 165.5);
        /* Fin Fecha de recibo y subtotal, descuento etc*/

        /*Firma y sello*/
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
        doc.setFont('Arial', 'bold');
        doc.text('SUBTOTAL:', x + 210, y + 140);
        doc.text('DESCUENTO:', x + 208, y + 148);
        doc.text('IVA:', x + 218, y + 156);
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL:', x + 215, y + 164);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Arial', '');
        doc.text('$ 1.000.000,00', x + 247, y + 140);
        doc.text('$ 1.000.000,00', x + 247, y + 148);
        doc.text('$ 1.000.000,00', x + 247, y + 156);
        doc.text('$ 1.000.000,00', x + 247, y + 164);
        /*Fin Subtotales y totales */

        /**Inicio Footer*/
        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(0, 0, 0);
        doc.rect(x + 2, y + 167, 205, 8, 'FD');
        doc.setFont('Arial', 'semibold');
        doc.setTextColor(255, 255, 255);
        doc.text('Bogotá D.C CRA 30 7-45 - 560 5000 FAX: 562 500 interrapidisimo.com', x + 45, y + 173);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Arial', 'bold');
        doc.text('CLIENTE', x + 254, y + 173);
        /**FIn Footer*/

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

}
