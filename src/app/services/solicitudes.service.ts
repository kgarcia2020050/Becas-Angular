import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitudes } from '../models/solicitudes';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  public url: String = 'https://becas-nodejs.herokuapp.com/api/';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  misSolicitudes(token): Observable<any> {
    let id = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'misSolicitudes/' + id, {
      headers: headersToken,
    });
  }

  verSolicitud(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'verSolicitud/' + id, {
      headers: headersToken,
    });
  }

  solicitantes(token): Observable<any> {
    let id = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + 'solicitantes/' + id, {
      headers: headersToken,
    });
  }

  aprobar(idSolicitud: String, idBeca: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(
      this.url + 'aprobar/' + idSolicitud + '/' + idBeca,
      '',
      {
        headers: headersToken,
      }
    );
  }

  denegar(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + 'denegar/' + id, '', {
      headers: headersToken,
    });
  }

  cancelarSolicitud(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + 'cancelar/' + id, {
      headers: headersToken,
    });
  }
}
