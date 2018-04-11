import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/model/user';

@Component({
  selector: 'tcc-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.participant);
  }

  @Input() participant: User;
}
