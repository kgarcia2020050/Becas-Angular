import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket: any;
  url = 'http://localhost:3030';
  constructor() {
    // @ts-ignore
    this.socket = io(this.url);
  }

  listen(eventName: String) {
    return new Observable((Subscriber) => {
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      });
    });
  }

  emit(eventName: String, data: any) {
    this.socket.emit(eventName, data);
  }
}
