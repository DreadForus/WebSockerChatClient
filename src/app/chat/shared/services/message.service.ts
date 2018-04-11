import { Injectable } from '@angular/core';
import {Message} from '../model/message';
import {SocketService} from './socket.service';
import {User} from '../model/user';

@Injectable()
export class MessageService {

    private _messages: Message[] = [];

    constructor(private socketService: SocketService) {
        socketService.onInit.subscribe((value: boolean) => {
            if(value){
                const route = '/topic/public';
                socketService.subscribe(route).subscribe((message: Message) => {
                    console.log("Received from " + route);
                    console.log(message);

                    this._messages.push(message);
                });
            }
        });
    }

    get messages(): Message[] {
        return this._messages;
    }
}
