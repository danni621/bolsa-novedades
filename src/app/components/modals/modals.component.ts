import { Component, OnInit, Input } from '@angular/core';
import { Functions } from '../../functions/functions';
import { HtmlService } from '../../components/html/html.module';
import { GuiaModule } from '../../module/guia.module';

declare var $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {

  @Input() guia = new GuiaModule();
  @Input() guiaLiberada: string = '';

  constructor(private htmlService: HtmlService,
    private functions: Functions) {
  }

  ngOnInit(): void {
  }

  Continuar() {
    $('#idVerEvidenciasModal').modal('hide');
  }

  EnviarRechazo() {
    let value = "";
    if ($('#causalRechazo1').prop('checked')) {
      value = $('#causalRechazo1').val();
    }

    if ($('#causalRechazo2').prop('checked')) {
      value = (value != "") ? value + '|' : '';
      value = value + $('#causalRechazo2').val();
    }

    $("#idRechazadoModal").modal("hide");
    this.functions.PopUpRechazar(this.htmlService.RechazarHtml(this.guia), this.guia);
  }

  Aprobar() {
    this.functions.PopUpAprobar(this.htmlService.AprobarHtml(this.guia), this.guia);
    $("#idConfAprobacion").modal('hide');
  }

  Rechazar() {
    $("#idConfRechazo").modal('hide');
    $("#idRechazadoModal").modal('show');
  }

}
