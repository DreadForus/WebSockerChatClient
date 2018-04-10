import { Injectable } from '@angular/core';
import {Message} from '../model/message';

@Injectable()
export class MessageService {

    private _messages: Message[] = [];

    constructor() { }

    get messages(): Message[] {
        return this._messages;
    }
}
