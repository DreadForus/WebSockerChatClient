import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../model/message';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const SERVER_URL = 'http://localhost:8080/ws';

@Injectable()
export class SocketService {
    private socket: Stomp.Client;

    public initSocket(): any {
        return new Promise((resolve) => {
            this.socket = Stomp.over(new SockJS(SERVER_URL));

            this.socket.connect({}, resolve);
        })
    }

    public send(route: string, message: any): void {
        this.socket.send(route, {},  JSON.stringify(message));
    }

    public subscribe(route: string): Observable<any> {
        return new Observable<Message>(observer => {
            this.socket.subscribe(route, (payload: any) => observer.next(JSON.parse(payload.body)));
        });
    }

    public unsubscribe(route: string){
        this.socket.unsubscribe(route)
    }
}
