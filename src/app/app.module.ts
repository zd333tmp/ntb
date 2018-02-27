import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppStateModule } from './state-store/app-state.module';
import { NotesConnectorService } from './services/notes-connector.service';
import { AppComponent } from './app.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteDetailsComponent,
    SearchBarComponent,
    ErrorAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppStateModule,
  ],
  providers: [
    NotesConnectorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
