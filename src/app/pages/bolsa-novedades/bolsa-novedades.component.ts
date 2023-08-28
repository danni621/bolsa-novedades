import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    this.guia.peso_envio = "1";
    this.guia.volumen_envio = "3";
    this.guia.largo_envio = "50";
    this.guia.ancho_envio = "50";
    this.guia.alto_envio = "50";
    this.guia.valorcomercial_envio = "25000";
    this.guia.valortotal_envio = "18500";
    this.guia.fechaAuditoria = "25/08/2023";
    this.guia.peso_auditoria = "5";
    this.guia.volumen_auditoria = "10";
    this.guia.largo_auditoria = "85";
    this.guia.ancho_auditoria = "85";
    this.guia.alto_auditoria = "85";
    this.guia.diferencia_peso = "7";
    this.guia.auditor = "Ricardo Quevedo";
    this.guia.observacion = "N/A";
    this.guia.valortotal_auditoria = "54000";
    this.guia.valorajuste = "35500";
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  VerEvidencias(event: Event) {
    event.preventDefault();
    $('#idVerEvidenciasModal').modal('show');
    /*const modalElement: HTMLElement | null = document.getElementById("idVerEvidenciasModal");
    modalElement!.style.display = "none";*/
    /*document.getElementById("loader")?.classList.remove("hide");
    document.getElementById("loader")?.classList.add("hide");*/
  }

}
