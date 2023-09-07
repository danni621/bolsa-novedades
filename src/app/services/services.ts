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

    ConsultarEncabezado() {
        return this.http.post(`${environment.url}consultarpendientesliquidacion`, '').pipe(
            map((resp: any) => {
                return resp;
            })
        );
    }
}