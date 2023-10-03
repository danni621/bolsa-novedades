import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class Service {

    token: any = "";
    private httoptions: any

    constructor(private http: HttpClient) {
    }


    async ConsumoServicio(metodo: any, data: any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let res: any = await this.ConsumoToken();
                this.token = res.IdToken;

                this.httoptions = {
                    headers: new HttpHeaders({
                        'Token': this.token,
                        'Content-Type': 'application/json'
                    })
                }

                const response = await lastValueFrom(
                    this.http.post(`${environment.url}${metodo}`, data, this.httoptions)
                        .pipe(
                            map((resp: any) => {
                                return resp;
                            })
                        )
                );

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }


    async ValidarToken(metodo: any, token: any) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const response = await lastValueFrom(this.http.post(`${environment.UrlAutenticacion}${metodo}`, token).pipe(
                    map((resp: any) => {
                        return resp;
                    })
                ));

                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }
    async ConsumoToken() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = {
                    Usuario: environment.Usuario,
                    Password: environment.Password
                }

                const response = await lastValueFrom(
                    this.http.post(`${environment.urlToken}`, data).pipe(
                        map((resp: any) => {
                            return resp;
                        })
                    )
                );
                resolve(response);

            } catch (error) {
                reject(error);
            }
        });
    }
}