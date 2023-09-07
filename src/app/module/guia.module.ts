import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class GuiaModule {
    guia: string = "";
    cantidadguias: string = "";
    origen: string = "";
    destino: string = "";
    fechaadmision: string ="";
    peso_envio: string = "";
    volumen_envio: string = "";
    largo_envio: string = "";
    ancho_envio: string = "";
    alto_envio: string = "";
    valorcomercial_envio: string = "";
    valortotal_envio: string = "";
    fechaAuditoria: string = "";
    peso_auditoria: string = "";
    volumen_auditoria: string = "";
    largo_auditoria: string = "";
    ancho_auditoria: string = "";
    alto_auditoria: string = "";
    valortotal_auditoria: string = "";
    diferencia_peso: string = "";
    auditor: string = "";
    idCentroServicio: string = "";
    observacion: string = "";
    valorajuste: string = "";
}
