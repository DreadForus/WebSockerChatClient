import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../shared/services/message-service.service';

@Component({
  selector: 'tcc-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
