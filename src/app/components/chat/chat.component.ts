import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  public identidad;
  chatUsuario = {
    usuario: '',
    texto: '',
  };

  mensajes;
  eventName = 'enviar';

  mensajesInicio = {
    usuario: '',
    texto: '',
  };

  constructor(private _chat: ChatService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.chatUsuario.usuario =
      this.identidad.nombre + ' ' + this.identidad.apellido;
    this.mensajesInicio.usuario =
      this.identidad.nombre + ' ' + this.identidad.apellido;  

    this.mensajesInicios();

    this._chat.listen('enviar-mensaje').subscribe({
      next: (response: any) => {
        this.mensajes = response;
      },
    });
  }

  misMensajes() {
    this._chat.emit(this.eventName, this.chatUsuario);
    this.chatUsuario.texto = '';
  }

  mensajesInicios() {
    this._chat.emit(this.eventName, this.mensajesInicio);
    this.mensajesInicio.texto = ' se ha unido al chat';
  }
}
