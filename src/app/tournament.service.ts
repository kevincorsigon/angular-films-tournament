import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from "./film";
import { ReponseWrapper } from "./reponseWrapper";
import { TournamentResult } from "./tournamentResult";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  selectedFilms = [];
  tournamentResult : TournamentResult;

  constructor(
       private http: HttpClient
  ) { }

  addToSelectedFilms(film) {
    this.selectedFilms.push(film);
  }

  removeFromSelectedFilms(film) {
    const index = this.selectedFilms.findIndex(x => x.id === film.id);
    this.selectedFilms.splice(index, 1);
  }

  getSelectedFilms() {
    return this.selectedFilms;
  }

  getLastTournamentResults() :TournamentResult  {
    return this.tournamentResult;
  }

  clearSelectedFilms() {
    this.selectedFilms = [];
    return this.selectedFilms;
  }

  getParticipantFilms() : Observable<ReponseWrapper<Film[]>>  {    
    return this.http.get<ReponseWrapper<Film[]>>('http://localhost:53656/api/Filme');
  }

  completeTournament(actionOnSuccess, actionOnError){
    return this.http.post<ReponseWrapper<TournamentResult>>('http://localhost:53656/api/Campeonato', { filmes : this.getSelectedFilms() })
    .subscribe(
        data  => {          
            this.tournamentResult = data.result;
            actionOnSuccess();
        },
        errorResponse  => {    
          actionOnError(errorResponse.error);
        }    
    );
  }
}