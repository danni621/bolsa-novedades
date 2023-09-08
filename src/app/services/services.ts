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

    ConsultarEncabezadoyInfoGuia(metodo: any, data: any) {
        return this.http.post(`${environment.url}${metodo}`, data).pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
}