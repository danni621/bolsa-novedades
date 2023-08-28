import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Service } from '../../services/services';
import { GuiaModule } from '../../module/guia.module';

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
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  VerEvidencias(event: Event) {
    event.preventDefault();
    /*const modalElement: HTMLElement | null = document.getElementById("idVerEvidenciasModal");
    modalElement!.style.display = "none";*/
    /*document.getElementById("loader")?.classList.remove("hide");
    document.getElementById("loader")?.classList.remove("show");*/
  }

}
