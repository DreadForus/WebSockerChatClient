import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';

import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';
import {HttpClient} from '@angular/common/http';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';
const SERVER_URL = 'http://localhost:8080';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  action = Action;
  user: User = {'name': 'test'};
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      dialogType: DialogUserType.NEW
    }
  };

  actions = Action;

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initModel();
    // Using timeout due to https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);

    // setTimeout(() => {
    //   this.authorizeUser('test')
    // }, 0);


  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    this.user = { };
  }

  private initIoConnection(): any {
    return this.socketService.initSocket().then(() => {
        const route = '/topic/public';
        this.ioConnection = this.socketService.subscribe(route).subscribe((message: Message) => {
            console.log("Received from " + route);
            console.log(message);

            this.messages.push(message);
        });

        this.socketService.subscribe('/user/message/authorization').subscribe((user: User) => {
            console.log("authorized");
            console.log(user);

            this.user = user;
        });
    });
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Edit Details',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.authorizeUser(paramsDialog.username);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
          console.log(this.user);

          const userToSend = Object.assign({
              action: Action.RENAME
          }, this.user);

          console.log(userToSend);

          return this.http.post(SERVER_URL + "/user/edit", userToSend).subscribe(user => {
              this.user = user;

              this.socketService.send('/app/chat.addUser', userToSend);
          });
      }
    });
  }

  public sendMessage(messageToSend: string): void {
    if (!messageToSend) {
      return;
    }

    const message: Message = {
        from: this.user,
        action: Action.CHAT,
        content: messageToSend
    };

    console.log("message");

    this.socketService.send('/app/chat.sendMessage', message);
    this.messageContent = null;
  }

  public authorizeUser(userName: string){
      console.log("authorizeUser: " + userName);
      this.initIoConnection().then(() => {
          this.socketService.send('/app/authorization.action', this.user);



      });
  }
}
