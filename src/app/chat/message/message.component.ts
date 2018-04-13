import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../shared/model/action';
import {UserService} from '../shared/services/user.service';
import {Message} from '../shared/model/message';
import {MatMenuModule} from '@angular/material/menu';
import {Utils} from '../shared/services/utils';

@Component({
  selector: 'tcc-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  actions = Action;

  constructor(public userService: UserService) { }

  ngOnInit() {

  }

  @Input() message: Message;

  getDateCreate() {
      const dateCreate = this.message.dateCreate;

      const d = new Date(Utils.convertISO8601toDate(dateCreate));

      const dateFormat = d.getHours() + ":" + d.getMinutes();

      console.log(Date.parse(this.message.dateCreate));
      console.log(d);

      return dateFormat;
  }

}
