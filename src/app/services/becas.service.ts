import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Becas } from '../models/becas';

@Injectable({
  providedIn: 'root',
})
export class BecasService {
  public url: String = 'https://becas-nodejs.herokuapp.com/api/';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  agregarBeca(modelo: Becas, token): Observable<any> {
    let id = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.post(this.url + 'nuevaBeca/' + id, parametros, {
      headers: headersToken,
    });
  }

  obtenerBecas(): Observable<any> {
    return this._http.get(this.url + 'becas');
  }

  becasEmpresa(id: String): Observable<any> {
    return this._http.get(this.url + 'misBecas/' + id);
  }

  becaId(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'becaId/' + id, { headers: headersToken });
  }

  editarBeca(modelo: Becas, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.put(this.url + 'editarBeca/' + modelo._id, parametros, {
      headers: headersToken,
    });
  }

  eliminarBeca(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + 'borrarBeca/' + id, {
      headers: headersToken,
    });
  }
}
