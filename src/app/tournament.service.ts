import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  selectedFilms = [];
  tournamentResult = {};

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

  clearSelectedFilms() {
    this.selectedFilms = [];
    return this.selectedFilms;
  }

  getParticipantFilms() {    
    return this.http.get('https://copafilmes.azurewebsites.net/api/filmes');
  }

  completeTournament(){
    //Post api 
  }
}