import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TournamentService } from "../tournament.service";
import { mockFilmList } from "../mockFilmList";

@Component({
  selector: "app-film-list",
  templateUrl: "./film-list.component.html",
  styleUrls: ["./film-list.component.css"]
})
export class FilmListComponent implements OnInit {
  films = mockFilmList;

  constructor(
    private route: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.films = mockFilmList; //this.tournamentService.getParticipantFilms();
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

  addToList(film) {
    this.tournamentService.addToSelectedFilms(film);
  }

  removeFromList(film) {
    this.tournamentService.removeFromSelectedFilms(film);
  }

  startTournament() {
    if (this.getSelectedSize() == 8) {
      window.alert("Campeonato iniciado, verificando finalistas...");
      this.tournamentService.clearSelectedFilms();
      this.route.navigate(["/results"]);
    } else {
      window.alert(
        "É necessário escolher 8 filmes para iniciar um campeonato!"
      );
    }
  }
}
