import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { NotesConnectorService } from '../../../services/notes-connector.service';
import { AppState } from '../../app-state.module';
import { RawNote } from '../../../services/raw-note.interface';
import * as fromApp from '../../selectors';
import * as NotesListActions from './notes-list.actions';

@Injectable()
export class NotesListEffects {

  private savedRawNotes$ = this.store.select(fromApp.selectSavedRawNotes);

  @Effect() loadNotesApiCall$ = this.actions
    .ofType(NotesListActions.LOAD_NOTES_START)
    .pipe(
      switchMap(() => {
        return this.notesConnectorService.getNotes().pipe(
          map((notes: Array<RawNote>) => new NotesListActions.LoadNotesSuccess({ notes })),
          catchError(error => of(new NotesListActions.LoadNotesError({ errorMessage: error.message })))
        );
      })
    );

  @Effect() saveNoteApiCall$ = this.actions
    .ofType(NotesListActions.SAVE_NOTE_START)
    .pipe(
      withLatestFrom(this.savedRawNotes$),
      switchMap(([ action, savedRawNotes ]) => {
        const { note } = (action as NotesListActions.SaveNoteStart).payload;
        const noteId = note.id;

        return this.notesConnectorService.saveNewNote(note, savedRawNotes).pipe(
          map(() => new NotesListActions.SaveNoteSuccess({ noteId })),
          catchError(error => of(new NotesListActions.SaveNoteError({ errorMessage: error.message })))
        );
      })
    );

  @Effect() deleteNoteApiCall$ = this.actions
    .ofType(NotesListActions.DELETE_NOTE_START)
    .pipe(
      withLatestFrom(this.savedRawNotes$),
      switchMap(([ action, savedRawNotes ]) => {
        const { note, noteIsSaved } = (action as NotesListActions.DeleteNoteStart).payload;

        return this.notesConnectorService.deleteNote(note, savedRawNotes).pipe(
          map(() => new NotesListActions.DeleteNoteSuccess()),
          catchError(error => of(new NotesListActions.DeleteNoteError({
            note,
            noteIsSaved,
            errorMessage: error.message
          })))
        );
      })
    );


  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private notesConnectorService: NotesConnectorService,
  ) { }
}
