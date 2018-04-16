import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from '../model/message';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import {HttpClient} from '@angular/common/http';

const SERVER_URL = 'http://localhost:8080/ws';

@Injectable()
export class SocketService {
    private socket: Stomp.Client;

    public onInit: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(){
        // this.initSocket().then(() => {
        //     this.onInit.next(true);
        // });
    }

    public initSocket(): any {
        return new Promise((resolve) => {
            this.socket = Stomp.over(new SockJS(SERVER_URL));
            this.socket.debug = function () {};
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
