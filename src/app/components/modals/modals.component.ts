import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {
  constructor() { }

  ngOnInit(): void {
  }

  Continuar() {
    $('#idVerEvidenciasModal').modal('hide');
  }

  EnviarRechazo() {
    alert($('#causalRechazo1').val());
  }

}
