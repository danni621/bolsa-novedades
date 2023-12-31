import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '../module/token.module';
import { environment } from 'src/environments/environment';
import { Service } from '../services/services';
import { Functions } from '../functions/functions';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(
        private router: Router,
        private service: Service,
        private functions: Functions) { }

    async canActivate() {
        try {
            let parametrosXUrl = new URLSearchParams(window.location.search);
            if (parametrosXUrl.has('IdToken') && parametrosXUrl.has('nombreusuario')) {
                let peticionValidarToken: Token = {
                    IdToken: parametrosXUrl.get('IdToken')!,
                    nombreusuario: parametrosXUrl.get('nombreusuario')!,
                    applicationname: environment.nombreAplicacion,
                };
                await this.ValidarToken(peticionValidarToken);
            } else if (localStorage.getItem("validarToken") != null) {
                let peticionValidarToken: Token = JSON.parse(localStorage.getItem("validarToken")!);
                await this.ValidarToken(peticionValidarToken);
            } else {
                await this.functions.SesionCaducada();
            }
        } catch (err: any) {
            await this.functions.SesionCaducada();
        }
    }

    setItemsToken(token: any, res: any) {
        localStorage.setItem("validarToken", JSON.stringify(token));
        localStorage.setItem("respuestaValidarToken", JSON.stringify(res));
        localStorage.setItem("nombreusuario", token.nombreusuario);
    }

    async ValidarToken(peticionValidarToken: any) {
        try {
            const res = await this.service.ValidarToken('/api/Autenticacion/ValidarToken', peticionValidarToken);
            this.setItemsToken(peticionValidarToken, res);
            sessionStorage.setItem('canActivateExecuted', 'true');
            window.location.href = '/bolsanovedades';
        } catch (err: any) {
            throw err;
        }
    }

}
