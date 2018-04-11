import { Injectable } from '@angular/core';
import {Message} from '../model/message';
import {User} from '../model/user';
import {SocketService} from './socket.service';
import {UserService} from './user.service';

@Injectable()
export class ParticipantService {

    private _participants: User[] = [];

    constructor(private socketService: SocketService, private userService: UserService) {
        socketService.onInit.subscribe((value: boolean) => {
            if(value){
                const route = '/app/chat.participants';
                socketService.subscribe(route).subscribe((participants: User[]) => {
                    console.log("participants from " + route);
                    console.log(participants);

                    this._participants = participants;
                });

                socketService.subscribe('/topic/chat.login').subscribe((participant: User) => {
                    // if(userService.user.id != participant.id){
                        this._participants.push(participant);

                        console.log(this.participants)
                    // }
                });

                socketService.subscribe('/topic/chat.logout').subscribe((participantLogout: User) => {
                    this._participants = this._participants.filter((participantInList) => participantInList.id = participantLogout.id);
                    console.log(this.participants)
                });
            }
        });
    }

    get participants(): User[] {
        return this._participants;
    }
}
