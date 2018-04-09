import { Injectable } from '@angular/core';
import {User} from '../model/user';

@Injectable()
export class UserService {

    private _user: User = { };

    constructor() { }

    set user(value: User) {
        console.log('set user: ' + value);
        this._user = value;
    }
    get user(): User {
        return this._user;
    }
}
