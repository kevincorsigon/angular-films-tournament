import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TournamentService } from "../tournament.service";
import { TournamentResult } from "../tournamentResult";

@Component({
  selector: 'app-tournament-result',
  templateUrl: './tournament-result.component.html',
  styleUrls: ['./tournament-result.component.css']
})
export class TournamentResultComponent implements OnInit {

  tournamentResult : TournamentResult;

  constructor(
    private route: Router,
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {    
    this.tournamentResult = this.tournamentService.getLastTournamentResults();
    if(!this.tournamentResult){
      this.route.navigate(["/"]);
    }
  }

}