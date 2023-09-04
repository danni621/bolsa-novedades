import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../components/pdf/pdfservice.module';
declare var $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {
  constructor(private pdfService: PdfService) {

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
    alert(value);
  }

  VerFactura() {
    this.pdfService.GenerarFactura();
  }

}
