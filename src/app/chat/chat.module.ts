import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';

import { ChatComponent } from './chat.component';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import {UserService} from './shared/services/user.service';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';
import {MessageService} from './shared/services/message.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ChatComponent, DialogUserComponent, MessageComponent, MessageListComponent],
  providers: [SocketService, UserService, MessageService],
  entryComponents: [DialogUserComponent]
})
export class ChatModule { }