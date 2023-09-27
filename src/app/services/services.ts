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

    ConsumoServicio(metodo: any, data: any, token: any) {

        this.httoptions = {
            headers: new HttpHeaders({
                'Token': token,
                'Content-Type': 'application/json'
            })
        }

        return this.http.post(`${environment.url}${metodo}`, data, this.httoptions).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }

    ValidarToken(metodo: any, token: any) {
        return this.http.post(`${environment.UrlAutenticacion}${metodo}`, token).pipe(
            map((resp: any) => {
                return resp;
            })
        );

    }

    ConsumoToken() {
        const data = {
            Usuario: environment.Usuario,
            Password: environment.Password
        }
        return this.http.post(`${environment.urlToken}`, data).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
}