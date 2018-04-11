import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {SocketService} from './socket.service';
import {Action} from '../model/action';

@Injectable()
export class UserService {

    private _user: User = { };

    constructor(private socketService: SocketService) {
        socketService.onInit.subscribe((value: boolean) => {
            if(value){
                console.log("value: " + value);
                socketService.subscribe('/user/message/authorization.user').subscribe((user: User) => {
                    console.log("authorized");
                    console.log(user);

                    this.user = user;

                    this.socketService.unsubscribe('/user/message/authorization.user');
                });
            }
        });
    }

    public authorizeUser(userName: string){
        const userToSend = this.user;
        userToSend.username = userName;

        this.socketService.onInit.subscribe((value) => {
            if(value){
                this.socketService.send('/app/authorization.user', userToSend)
            }
        });
    }

    public rename(newName: string){
        const userToSend = Object.assign({
            action: Action.RENAME
        }, this.user);

        userToSend.username = newName;

        this.socketService.subscribe('/user/message/edit.user').subscribe((user: User) => {
            this.user = user;

            this.socketService.unsubscribe('/user/message/edit.user');
        });

        this.socketService.send('/app/edit.user', userToSend)
    }
    set user(value: User) {
        this._user = value;
    }

    get user(): User {
        return this._user;
    }
}
