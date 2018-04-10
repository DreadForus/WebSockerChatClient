import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../shared/model/action';
import {UserService} from '../shared/services/user.service';
import {Message} from '../shared/model/message';

@Component({
  selector: 'tcc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  actions = Action;

  constructor(public userService: UserService) { }

  ngOnInit() {
    console.log(this.message)
  }

  @Input() message: Message;

  getDateCreate() {
      const d = new Date(this.message.dateCreate);

      return  d.getHours() + ":" + d.getMinutes();
    }
}
