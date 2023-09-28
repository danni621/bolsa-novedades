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

    canActivate() {
        return new Promise(async (resolve, reject) => {
            try {
                let parametrosXUrl = new URLSearchParams(window.location.search);
                if (parametrosXUrl.has('IdToken') && parametrosXUrl.has('nombreusuario')) {
                    let peticionValidarToken: Token = {
                        IdToken: parametrosXUrl.get('IdToken')!,
                        nombreusuario: parametrosXUrl.get('nombreusuario')!,
                        applicationname: environment.nombreAplicacion,
                    };

                    try {
                        const res = await this.service.ValidarToken('/api/Autenticacion/ValidarToken', peticionValidarToken);
                        this.setItemsToken(peticionValidarToken, res);
                        localStorage.setItem('canActivateExecuted', 'true');
                        window.location.href = '/bolsanovedades';
                        resolve(true);
                    } catch (err) {
                        await this.functions.SesionCaducada();
                        resolve(false);
                    }
                } else if (localStorage.getItem("validarToken") != null) {
                    let peticionValidarToken: Token = JSON.parse(localStorage.getItem("validarToken")!);

                    try {
                        const res = await this.service.ValidarToken('/api/Autenticacion/ValidarToken', peticionValidarToken);
                        this.setItemsToken(peticionValidarToken, res);
                        localStorage.setItem('canActivateExecuted', 'true');
                        window.location.href = '/bolsanovedades';
                        resolve(true);
                    } catch (err) {
                        await this.functions.SesionCaducada();
                        resolve(false);
                    }
                } else {
                    await this.functions.SesionCaducada();
                    resolve(false);
                }
            } catch (err) {
                await this.functions.SesionCaducada();
                resolve(false);
            }
        });
    }

    async setItemsToken(token: any, res: any) {
        localStorage.setItem("validarToken", JSON.stringify(token));
        localStorage.setItem("respuestaValidarToken", JSON.stringify(res));
        localStorage.setItem("nombreusuario", token.nombreusuario);
    }

}
