import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TournamentService } from "../tournament.service";
import { Film } from "../film";

@Component({
  selector: "app-film-list",
  templateUrl: "./film-list.component.html",
  styleUrls: ["./film-list.component.css"]
})
export class FilmListComponent implements OnInit {
  films : Film[];

  constructor(
    private route: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.tournamentService.getParticipantFilms().subscribe(response => {      
      if(response.status === 200){
        this.films = response.result;
      }   
    });
  }

  getSelectedSize() {
    return this.tournamentService.getSelectedFilms().length;
  }

  onChange(id: string, isChecked: boolean) {
    if (this.getSelectedSize() < 8) {
      const index = this.films.findIndex(x => x.id == id);
      let film = this.films[index];
      if (isChecked) {
        this.addToList(film);
      } else {
        this.removeFromList(film);
      }
    } else {
      isChecked = false;
    }
  }

  disableCheck(id: string) {
    const index = this.tournamentService
      .getSelectedFilms()
      .findIndex(x => x.id == id);
    if (this.getSelectedSize() < 8 || index > -1) {
      return false;
    }
    return true;
  }

  addToList(film: Film) {
    this.tournamentService.addToSelectedFilms(film);
  }

  removeFromList(film: Film) {
    this.tournamentService.removeFromSelectedFilms(film);
  }

  startTournament() {
    if (this.getSelectedSize() == 8) {
      let self = this;
      window.alert("Campeonato iniciado, verificando finalistas...");
      this.tournamentService.completeTournament(()=>{
        self.tournamentService.clearSelectedFilms();
        self.route.navigate(["/results"]);
      }, 
      (msg)=>{
        window.alert(
         'Ocorreu um erro: ' + msg
        );
      });      
    } else {
      window.alert(
        "É necessário escolher 8 filmes para iniciar um campeonato!"
      );
    }
  }
}
