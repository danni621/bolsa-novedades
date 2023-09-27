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

    /*const canActivateExecuted = localStorage.getItem('canActivateExecuted');
    if (!canActivateExecuted) {
      await this.authguard.canActivate();
      localStorage.setItem('canActivateExecuted', 'true');
    }*/
    //750000026419

    this.guiaBuscar = localStorage.getItem("GuiaBuscar") ?? '';
    this.GuiaLiberar = localStorage.getItem("GuiaLiberar") ?? '';
    localStorage.removeItem("GuiaBuscar");
    localStorage.removeItem("GuiaLiberar");

    if (this.GuiaLiberar != "") {
      await this.CambiosEstadoLiq(this.GuiaLiberar, 1, EstadosGuia.PorAuditor, true);
      this.GuiaLiberar = "";
    } else if (localStorage.getItem("GuiaPorAuditar") != null && localStorage.getItem("GuiaPorAuditar") != "") {
      await this.CambiosEstadoLiq(localStorage.getItem("GuiaPorAuditar"), 1, EstadosGuia.PorAuditor, true);
    }

    await this.ConsumoHeader();

  }

  VerEvidencias(event: Event) {
    event.preventDefault();
    $('#loader').removeClass('hide');
    this.service.ConsumoToken().subscribe({
      next: (resp: any) => {
        this.token = resp.IdToken;
        this.service.ConsumoServicio('cargarimagenes', this.guia.guia, this.token).subscribe({
          next: (res: any) => {
            this.imagenes = res;
            $('#idVerEvidenciasModal').modal('show');
            $('#loader').addClass('hide');
          },
          error: (err: any) => {
            if (err.status == 400) {
              this.functions.PopUpAlert('', 'info', err.error, true, false);
              $('#loader').addClass('hide');
            } else {
              this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false);
            }
          }
        });
      },
      error: (err: any) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
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

  async ConsumoHeader() {
    this.service.ConsumoToken().subscribe({
      next: (resp: any) => {
        this.token = resp.IdToken;

        this.service.ConsumoServicio('consultarpendientesliquidacion', '', this.token).subscribe({
          next: (res: any) => {
            if (res.GuiaGestionar == '0') {
              this.functions.PopUpAlert('', 'info', 'No hay guías pendientes por gestionar', false, false, true);
            } else {
              res.GuiaGestionar = ((this.guiaBuscar != "") ? this.guiaBuscar : res.GuiaGestionar);
              this.GuiaEnGestion = res.GuiaGestionar;
              this.ConsumoInfoGuia(this.GuiaEnGestion);
            }
          },
          error: (err: any) => {
            this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
          }
        });

      },
      error: (err: any) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    });
  }

  ConsumoInfoGuia(guia: any) {
    this.service.ConsumoToken().subscribe({
      next: (resp: any) => {
        this.token = resp.IdToken;
        this.service.ConsumoServicio('consultarinfoliquidacion', guia, this.token).subscribe({
          next: (res: any) => {
            this.CambiosEstadoLiq(guia, 1, EstadosGuia.Auditando);
            this.guia = this.utilitarios.CargarInfoGuia(res);
            this.ChangeColor();

          },
          error: (err: any) => {
            if (err.status == 400) {
              this.functions.PopUpAlert('', 'info', err.error, true, false, true);
            } else {
              this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
            }
          }
        });
      }, error: (err: any) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    });
  }


  async CambiosEstadoLiq(guia: any, idtiponovedad: number, idestadonovedad: number, consumenca: boolean = false) {

    let estado: CambiosEstadoLiquidacionModule = {
      NumeroGuia: guia,
      IdTipoNovedad: idtiponovedad,
      IdEstadoNovedad: idestadonovedad,
      CreadoPor: localStorage.getItem('nombreusuario') ?? 'SISTEMA'
    }

    this.service.ConsumoToken().subscribe({
      next: (resp: any) => {
        this.token = resp.IdToken;
        this.service.ConsumoServicio('CambiarEstadoLiquidacion', estado, this.token).subscribe({
          next: (res: any) => {
            if (!consumenca) {
              this.ConsumoEncabezado();
            }
          },
          error: (err: any) => {
            this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
          }
        });
      }, error: (err: any) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    });

  }

  ConsumoEncabezado() {
    this.service.ConsumoToken().subscribe({
      next: (resp: any) => {
        this.token = resp.IdToken;
        this.service.ConsumoServicio('consultarpendientesliquidacion', '', this.token).subscribe({
          next: (res: any) => {
            this.guia = this.utilitarios.CargarInfoEncabezado(res);
            $('#loader').addClass('hide');
            this.guia.guia = this.GuiaEnGestion;
            if (this.guiaBuscar != "") {
              this.guiaBuscar = "";
            }
            localStorage.setItem("GuiaPorAuditar", this.guia.guia);
          },
          error: (err: any) => {
            this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
          }
        });
      }, error: (err: any) => {
        this.functions.PopUpAlert('Error en el servidor', 'error', err.message, true, false, false);
      }
    });
  }
  BuscarGuia() {
    if (this.guia.guia != $("#inputGuia").val()) {
      $('#loader').removeClass('hide');
      this.guiaBuscar = $("#inputGuia").val();
      this.functions.PopUpBuscar(this.htmlservice.BuscarHtml(this.guia, this.guiaBuscar), this.guia, this.guiaBuscar);
    }
  }

}
