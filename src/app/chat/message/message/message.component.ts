import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../shared/model/message';
import {Action} from '../../shared/model/action';
import {UserService} from '../../shared/services/user.service.service';

@Component({
  selector: 'tcc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  actions = Action;

  constructor(public userService: UserService) { }

  ngOnInit() { console.log(this.message) }

  @Input() message: Message;
}
