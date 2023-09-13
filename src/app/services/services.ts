import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class Service {

    constructor(private http: HttpClient) {
    }

    ConsumoServicio(metodo: any, data: any) {
        return this.http.post(`${environment.url}${metodo}`, data).pipe(
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
}