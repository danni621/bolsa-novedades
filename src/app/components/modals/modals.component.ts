import { Component, OnInit, Input } from '@angular/core';
import { Functions } from '../../functions/functions';
import { HtmlService } from '../../components/html/html.module';
import { GuiaModule } from '../../module/guia.module';
import { RespuestaCargarImagenes } from '../../module/respuestacargarimagenes.module';
import { ResultadoAuditoria, AfectacionCaja } from '../../module/resultadoauditoria.module';
import { ResponseDatosFactura } from '../../module/responsedatosfactura.module';
import { Service } from '../../services/services';
import { EstadosGuia } from '../../enums/enums';

declare var $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {

  @Input() guia = new GuiaModule();
  @Input() guiaBuscar: string = '';
  @Input() imagenes: RespuestaCargarImagenes[] = [];
  token: any = "";

  constructor(private htmlService: HtmlService,
    private functions: Functions,
    private service: Service) {
  }

  ngOnInit(): void {
  }

  Continuar() {
    $('#idVerEvidenciasModal').modal('hide');
  }

  async Aprobar() {
    $("#idConfAprobacion").modal('hide');
    $('#loader').removeClass('hide');
    let auditoria = this.CrearDataAuditoria(EstadosGuia.Aprobado, '');
    await this.ConsumoAuditoria(auditoria, true);
  }

  async EnviarRechazo() {
    let value = "";
    if ($('#causalRechazo1').prop('checked')) {
      value = $('#causalRechazo1').val();
    }

    if ($('#causalRechazo2').prop('checked')) {
      value = (value != "") ? value + ' y ' : '';
      value = value + $('#causalRechazo2').val();
    }

    if (value != "") {
      $('#loader').removeClass('hide');
      $("#idRechazadoModal").modal("hide");
      let auditoria = this.CrearDataAuditoria(EstadosGuia.Rechazado, value);
      await this.ConsumoAuditoria(auditoria, false);
    } else {
      alert("Debe escoger al menos 1 opción");
    }

  }

  Rechazar() {
    $('#causalRechazo1').prop('checked', false);
    $('#causalRechazo2').prop('checked', false);
    $("#idConfRechazo").modal('hide');
    $("#idRechazadoModal").modal('show');
  }

  CrearDataAuditoria(estado: any, observacion: any) {

    let auditoria: ResultadoAuditoria = {
      Resultado: estado,
      AfectacionCaja: {
        CentroServicio: parseInt(this.guia.idCentroServicio),
        ValorAjuste: parseInt(this.guia.valorajuste),
        NumeroGuia: parseInt(this.guia.guia),
        creadoPor: localStorage.getItem('nombreusuario') ?? 'SISTEMA',
        CentroServicioMensajero: parseInt(this.guia.idCentroServicioMensajero)
      },
      Observacion: observacion
    }

    return auditoria;
  }

  async ConsumoAuditoria(auditoria: any, aprobrecha: boolean) {
    try {
      let res = await this.service.ConsumoServicio('guardarresultadoauditoria', auditoria);
      $('#loader').addClass('hide');
      if (aprobrecha) {
        let datosfactura: ResponseDatosFactura = res;
        this.removeItemns();
        this.functions.PopUpAprobar(this.htmlService.AprobarHtml(this.guia), this.guia, datosfactura);
      } else {
        this.removeItemns();
        this.functions.PopUpRechazar(this.htmlService.RechazarHtml(this.guia), this.guia);
      }
    } catch (err: any) {
      if (err.status == 400) {
        this.functions.PopUpAlert('', 'info', err.error, true, false, true);
      } else {
        $('#loader').addClass('hide');
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    }
  }

  removeItemns() {
    sessionStorage.removeItem("GuiaPorAuditar");
    sessionStorage.removeItem("canActivateExecuted");
  }

}
