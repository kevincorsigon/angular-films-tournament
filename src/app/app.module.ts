import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { FilmListComponent } from "./film-list/film-list.component";
import { TournamentResultComponent } from "./tournament-result/tournament-result.component";
import { TournamentService } from './tournament.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: FilmListComponent },
      { path: "results", component: TournamentResultComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    FilmListComponent,
    TournamentResultComponent
  ],
  bootstrap: [AppComponent],
  providers: [TournamentService]
})
export class AppModule {}
