import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Service } from '../../services/services';
import { GuiaModule } from '../../module/guia.module';
import { Functions } from '../../functions/functions';
import { HtmlService } from '../../components/html/html.module';

import { Utilitarios } from '../../utilitarios/utilitarios.component';
import { AuthGuard } from '../../guards/auth.guard';


declare var $: any;

@Component({
  selector: 'app-bolsa-novedades',
  templateUrl: './bolsa-novedades.component.html',
  styleUrls: ['./bolsa-novedades.component.css']
})
export class BolsaNovedadesComponent {

  guia = new GuiaModule();
  guiaLiberada: string = '';
  imagenes: any[] = [];

  constructor(private modalService: NgbModal,
    private functions: Functions,
    private service: Service,
    private htmlservice: HtmlService,
    private utilitarios: Utilitarios,
    private authguard: AuthGuard) {


  }

  ngOnInit(): void {
    $('#loader').removeClass('hide');
    /*const canActivateExecuted = localStorage.getItem('canActivateExecuted');
    if (!canActivateExecuted) {
      this.authguard.canActivate();
      localStorage.setItem('canActivateExecuted', 'true');
    }*/
    this.ConsumoEnCabezado();
    this.ChangeColor();
  }

  VerEvidencias(event: Event) {
    event.preventDefault();
    $('#loader').removeClass('hide');
    this.service.ConsumoServicio('cargarimagenes', this.guia.guia).subscribe({
      next: (res) => {
        this.imagenes = res;
        $('#idVerEvidenciasModal').modal('show');
        $('#loader').addClass('hide');
      },
      error: (err) => {
        if (err.status == 400) {
          this.functions.PopUpAlert('', 'info', err.error, true, false);
          $('#loader').addClass('hide');
        } else {
          this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false);
        }
      }
    });
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

  ConsumoEnCabezado() {
    this.service.ConsumoServicio('consultarpendientesliquidacion', '').subscribe({
      next: (res) => {
        this.guia = this.utilitarios.CargarInfoEncabezado(res);
        this.ConsumoInfoGuia(this.guia);
      },
      error: (err) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false);
      }
    });
  }

  ConsumoInfoGuia(guia: any) {
    this.service.ConsumoServicio('consultarinfoliquidacion', this.guia.guia).subscribe({
      next: (res) => {
        this.guia = this.utilitarios.CargarInfoGuia(res);
        $('#loader').addClass('hide');
      },
      error: (err) => {
        if (err.status == 400) {
          this.functions.PopUpAlert('', 'info', err.error, true, false);
        } else {
          this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false);
        }
      }
    });
  }

  BuscarGuia() {
    if (this.guia.guia != $("#inputGuia").val()) {
      this.guiaLiberada = $("#inputGuia").val();
      this.functions.PopUpBuscar(this.htmlservice.BuscarHtml(this.guia, this.guiaLiberada), this.guia, this.guiaLiberada);
    }
  }

}
