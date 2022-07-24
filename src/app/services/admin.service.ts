import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public url: String = 'http://localhost:3000/api/';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(public _http: HttpClient) {}

  empresasRegistradas(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'empresasRegistradas', {
      headers: headersToken,
    });
  }

  nuevaEmpresa(modelo: Usuario, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.post(this.url + 'nuevaEmpresa', parametros, {
      headers: headersToken,
    });
  }

  usuariosRegistrados(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'usuariosRegistrados', {
      headers: headersToken,
    });
  }
}
