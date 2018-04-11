import { Component, OnInit } from '@angular/core';
import {ParticipantService} from '../shared/services/participant.service';

@Component({
  selector: 'tcc-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  constructor(public participantService: ParticipantService) { }

  ngOnInit() {
  }

}
