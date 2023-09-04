import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";

import { Service } from '../../services/services';
import { GuiaModule } from '../../module/guia.module';

declare var $: any;

@Component({
  selector: 'app-bolsa-novedades',
  templateUrl: './bolsa-novedades.component.html',
  styleUrls: ['./bolsa-novedades.component.css']
})
export class BolsaNovedadesComponent {

  guia = new GuiaModule();

  constructor() {
    this.guia.guia = '7000000';
    this.guia.cantidadguias = '99';
    this.guia.origen = "Medellin";
    this.guia.destino = "Bogota";
    this.guia.fechaadmision = "23/08/2023";
    this.guia.peso_envio = "5";
    this.guia.volumen_envio = "3";
    this.guia.largo_envio = "50";
    this.guia.ancho_envio = "50";
    this.guia.alto_envio = "50";
    this.guia.valorcomercial_envio = "25000";
    this.guia.valortotal_envio = "18500";
    this.guia.fechaAuditoria = "25/08/2023";
    this.guia.peso_auditoria = "5";
    this.guia.volumen_auditoria = "10";
    this.guia.largo_auditoria = "50";
    this.guia.ancho_auditoria = "85";
    this.guia.alto_auditoria = "50";
    this.guia.diferencia_peso = "7";
    this.guia.auditor = "Ricardo Quevedo";
    this.guia.observacion = "N/A";
    this.guia.valortotal_auditoria = "54000";
    this.guia.valorajuste = "35500";
  }

  ngOnInit(): void {
    localStorage.clear();
    this.ChangeColor();
    this.GenerarFactura();
  }

  VerEvidencias(event: Event) {
    event.preventDefault();
    $('#loader').removeClass('hide');
    $('#idVerEvidenciasModal').modal('show');
    $('#loader').addClass('hide');
  }

  ChangeColor() {
    this.applyStyleIfDifferent(this.guia.peso_envio, this.guia.peso_auditoria, 'peso-2');
    this.applyStyleIfDifferent(this.guia.volumen_envio, this.guia.volumen_auditoria, 'volumen-2');
    this.applyStyleIfDifferent(this.guia.largo_envio, this.guia.largo_auditoria, 'largo-2');
    this.applyStyleIfDifferent(this.guia.ancho_envio, this.guia.ancho_auditoria, 'ancho-2');
    this.applyStyleIfDifferent(this.guia.alto_envio, this.guia.alto_auditoria, 'alto-2');
  }

  applyStyleIfDifferent(value: any, auditValue: any, elementId: any) {
    if (value !== auditValue) {
      $('#' + elementId).css({
        "background-color": "#F18F7C",
        "border": "2px solid #F18F7C"
      });
    }
  }

  GenerarFactura() {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    let x: number = 10;
    let y: number = 10;

    doc.setFontSize(12);

    doc.addImage('../../assets/img/interrapidisimo.jpg', 'JPEG', x, y, 60, 30);

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

    /*doc.cell(x + 2, y + 45, 160, 20, '', 1, 'center');*/
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
    doc.setFillColor(211, 211, 211); // Rojo (RGB)
    doc.rect(x + 2, y + 85, 34.5, 10, 'FD');
    doc.rect(x + 36.5, y + 85, 207, 10, 'FD');
    doc.rect(x + 243.5, y + 85, 34.5, 10, 'FD');
    doc.setFontSize(12);
    doc.setFont('Arial', 'bold');
    doc.text('CANTIDAD', x + 8, y + 91);
    doc.text('DETALLE', x + 127, y + 91);
    doc.text('VALOR', x + 253, y + 91);

    doc.rect(x + 2, y + 95, 276, 40);
    /* Fin cuerpo factura*/

    /* Inicio Fecha de recibo y subtotal, descuento etc*/
    doc.cell(x + 2, y + 135, 125, 8, 'FECHA DE RECIBIDO:', 0, 'center');
    doc.cell(x + 2, y + 143, 125, 8, 'NOMBRE QUIEN RECIBE:', 1, 'center');
    doc.cell(x + 2, y + 151, 125, 8, 'IDENTIFICACION:', 0, 'center');
    doc.cell(x + 2, y + 159, 125, 8, 'VALOR LETRAS:', 1, 'center');
    /* Fin Fecha de recibo y subtotal, descuento etc*/

    window.open(doc.output('bloburl'), '_blank');
    //doc.save('mi-documento.pdf');

  }


}
