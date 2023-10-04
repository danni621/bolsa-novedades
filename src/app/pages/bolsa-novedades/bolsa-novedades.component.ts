import { Component } from '@angular/core';

import { Service } from '../../services/services';
import { GuiaModule } from '../../module/guia.module';
import { RespuestaCargarImagenes } from '../../module/respuestacargarimagenes.module';
import { CambiosEstadoLiquidacionModule } from '../../module/cambiostestadoliq.module';
import { Functions } from '../../functions/functions';
import { HtmlService } from '../../components/html/html.module';

import { Utilitarios } from '../../utilitarios/utilitarios.component';
import { AuthGuard } from '../../guards/auth.guard';
import { EstadosGuia } from '../../enums/enums';


declare var $: any;

@Component({
  selector: 'app-bolsa-novedades',
  templateUrl: './bolsa-novedades.component.html',
  styleUrls: ['./bolsa-novedades.component.css']
})

export class BolsaNovedadesComponent {

  guia = new GuiaModule();
  guiaBuscar: string = '';
  GuiaLiberar: string = '';
  GuiaEnGestion: string = '';
  imagenes: RespuestaCargarImagenes[] = [];
  token: any = "";

  constructor(private functions: Functions,
    private service: Service,
    private htmlservice: HtmlService,
    private utilitarios: Utilitarios,
    private authguard: AuthGuard) {

  }

  async ngOnInit(): Promise<void> {
    $('#loader').removeClass('hide');

    const canActivateExecuted = sessionStorage.getItem('canActivateExecuted');
    if (!canActivateExecuted) {
      await this.authguard.canActivate();
    }

    this.guiaBuscar = sessionStorage.getItem("GuiaBuscar") ?? '';
    this.GuiaLiberar = sessionStorage.getItem("GuiaLiberar") ?? '';
    sessionStorage.removeItem("GuiaBuscar");
    sessionStorage.removeItem("GuiaLiberar");

    if (this.GuiaLiberar != "" && this.GuiaLiberar != null) {
      await this.CambiosEstadoLiq(this.GuiaLiberar, 1, EstadosGuia.PorAuditor, true);
      this.GuiaLiberar = "";
    }

    await this.ConsumoHeader();

  }


  async VerEvidencias(event: Event) {
    event.preventDefault();
    $('#loader').removeClass('hide');
    try {
      let res = await this.service.ConsumoServicio('cargarimagenes', this.guia.guia);
      this.imagenes = res;
      $('#idVerEvidenciasModal').modal('show');
      $('#loader').addClass('hide');

    } catch (err: any) {
      if (err.status == 400) {
        this.functions.PopUpAlert('', 'info', err.error, true, false);
        $('#loader').addClass('hide');
      } else {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false);
      }
    }
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

  async ConsumoHeader() {

    try {
      let res = await this.service.ConsumoServicio('consultarpendientesliquidacion', '');
      if (res.GuiaGestionar == '0') {
        let sitiologin = 'sitiologin';
        this.functions.PopUpAlert('', 'info', 'No hay guías pendientes por gestionar', false, false, true, sitiologin);
      } else {
        if (sessionStorage.getItem("GuiaPorAuditar") != null && sessionStorage.getItem("GuiaPorAuditar") != "") {
          await this.CambiosEstadoLiq(sessionStorage.getItem("GuiaPorAuditar"), 1, EstadosGuia.PorAuditor, true);
        }
        res.GuiaGestionar = ((this.guiaBuscar != "") ? this.guiaBuscar : res.GuiaGestionar);
        this.GuiaEnGestion = res.GuiaGestionar;
        await this.ConsumoInfoGuia(this.GuiaEnGestion);
      }
    } catch (err: any) {
      this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
    }
  }


  async ConsumoInfoGuia(guia: any) {
    try {
      let res = await this.service.ConsumoServicio('consultarinfoliquidacion', guia);
      await this.CambiosEstadoLiq(guia, 1, EstadosGuia.Auditando);
      this.guia = this.utilitarios.CargarInfoGuia(res);
      this.ChangeColor();
    } catch (err: any) {
      if (err.status == 400) {
        this.functions.PopUpAlert('', 'info', err.error, true, false, true);
      } else {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    }
  }


  async CambiosEstadoLiq(guia: any, idtiponovedad: number, idestadonovedad: number, consumenca: boolean = false) {

    let estado: CambiosEstadoLiquidacionModule = {
      NumeroGuia: guia,
      IdTipoNovedad: idtiponovedad,
      IdEstadoNovedad: idestadonovedad,
      CreadoPor: localStorage.getItem('nombreusuario') ?? 'SISTEMA'
    }

    try {
      await this.service.ConsumoServicio('CambiarEstadoLiquidacion', estado);
      if (!consumenca) {
        await this.ConsumoEncabezado();
      }
    } catch (err: any) {
      this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
    }
  }

  async ConsumoEncabezado() {

    try {
      let res = await this.service.ConsumoServicio('consultarpendientesliquidacion', '');
      this.guia = this.utilitarios.CargarInfoEncabezado(res);
      $('#loader').addClass('hide');
      this.guia.guia = this.GuiaEnGestion;
      if (this.guiaBuscar != "") {
        this.guiaBuscar = "";
      }
      sessionStorage.setItem("GuiaPorAuditar", this.guia.guia);
    } catch (err: any) {
      this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
    }
  }

  BuscarGuia() {
    if (this.guia.guia != $("#inputGuia").val()) {
      $('#loader').removeClass('hide');
      this.guiaBuscar = $("#inputGuia").val();
      this.functions.PopUpBuscar(this.htmlservice.BuscarHtml(this.guia, this.guiaBuscar), this.guia, this.guiaBuscar);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const keycode = event.which || event.keyCode;
    if (keycode === 8) {
      return;
    }

    if (keycode === 69 || this.isSpecialCharacter(keycode)) {
      event.preventDefault();
    }
  }

  isSpecialCharacter(keycode: number): boolean {
    return !((keycode >= 48 && keycode <= 57) ||
      (keycode >= 65 && keycode <= 90) ||
      (keycode >= 97 && keycode <= 122) ||
      (keycode === 43));
  }

}
