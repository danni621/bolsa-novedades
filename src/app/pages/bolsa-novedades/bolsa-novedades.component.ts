import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Service } from '../../services/services';
import { GuiaModule } from '../../module/guia.module';
import { Functions } from '../../functions/functions';



declare var $: any;

@Component({
  selector: 'app-bolsa-novedades',
  templateUrl: './bolsa-novedades.component.html',
  styleUrls: ['./bolsa-novedades.component.css']
})
export class BolsaNovedadesComponent {

  guia = new GuiaModule();

  constructor(private modalService: NgbModal,
    private functions: Functions,
    private service: Service) {

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
    this.guia.idCentroServicio = "1295";
    this.guia.observacion = "N/A";
    this.guia.valortotal_auditoria = "54000";
    this.guia.valorajuste = "35500";
  }

  ngOnInit(): void {
    localStorage.clear();
    $('#loader').removeClass('hide');
    this.ChangeColor();
    this.service.ConsultarEncabezado().subscribe({
      next: (res) => {
        $('#loader').addClass('hide');
        this.guia.guia = res.GuiaGestionar;
        this.guia.guiasiguiente = res.SiguienteGuia;
        this.guia.cantidadguias = res.PendientePorGestionar;
      },
      error: (err) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false)
      }
    });
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

  ConfirmAprobar() {
    $("#idConfAprobacion").modal('show');
  }

  ConfirmRechazar() {
    $("#idConfRechazo").modal('show');
  }


}
