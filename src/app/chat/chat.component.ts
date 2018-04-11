import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MatList, MatListItem} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

import { Action } from './shared/model/action';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { DialogUserType } from './dialog-user/dialog-user-type';
import {UserService} from './shared/services/user.service';
import {MessageService} from './shared/services/message.service';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  messageContent: string;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      dialogType: DialogUserType.NEW
    }
  };

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
      private socketService: SocketService,
      public userService: UserService,
      public messageService: MessageService,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.openUserPopup(this.defaultDialogUserParams);
    // }, 0);

    setTimeout(() => {
        this.userService.authorizeUser("test")
    }, 0);
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

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.userService.user.username,
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
        this.userService.authorizeUser(paramsDialog.username);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
          this.userService.rename(paramsDialog.username);
      }
    });
  }

  public sendMessage(messageToSend: string): void {
    if (!messageToSend) {
      return;
    }

    const message: Message = {
        from: this.userService.user,
        action: Action.CHAT,
        content: messageToSend
    };

    console.log("message");

    this.socketService.send('/app/chat.sendMessage', message);
    this.messageContent = null;
  }
}
