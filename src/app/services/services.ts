import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class Service {

    token: any = "";
    private httoptions: any

    constructor(private http: HttpClient) {
    }

    async ConsumoServicio(metodo: any, data: any) {

        let res: any = await this.ConsumoToken();
        this.token = res.IdToken;

        this.httoptions = {
            headers: new HttpHeaders({
                'Token': this.token,
                'Content-Type': 'application/json'
            })
        }

        return this.http.post(`${environment.url}${metodo}`, data, this.httoptions).pipe(
            map((resp: any) => {
                return resp;
            })
        ).toPromise();
    }

    ValidarToken(metodo: any, token: any) {
        return this.http.post(`${environment.UrlAutenticacion}${metodo}`, token).pipe(
            map((resp: any) => {
                return resp;
            })
        );

    }
    async ConsumoToken() {
        const data = {
            Usuario: environment.Usuario,
            Password: environment.Password
        }
        try {
            const resp = await this.http.post(`${environment.urlToken}`, data).toPromise();
            return resp;
        } catch (error) {
            console.error('Error al obtener el token:', error);
            throw error;
        }
    }
}