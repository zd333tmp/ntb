import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from './state-store/app-state.module';
import { Note } from './state-store/selectors/note.interface';
import { PartialNoteUpdates } from './state-store/slices/notes-list/notes-list.actions';
import * as fromApp from './state-store/selectors';
import * as NotesListActions from './state-store/slices/notes-list/notes-list.actions';
import * as SearchParamsActions from './state-store/slices/search-params/search-params.actions';

/**
 * App root. Usually contains router outlet
 * and handles only root state data/flow (e.g. session data, etc.).
 * But in the app there is no routing, thus AppComponent acts as smart container
 * that proxies state to dumb components and vice versa.
 */
@Component({
  selector: 'ntb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly notes$ = this.store.select(fromApp.selectMatchingNotes);
  readonly searchByKeywords$ = this.store.select(fromApp.selectSearchByKeywords);
  readonly allowSaveDelete$ = this.store.select(fromApp.selectAllowSaveDelete);
  readonly errorMessage$ = this.store.select(fromApp.selectErrorMessage);

  currentNote: Note;
  private subs: Array<Subscription> = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.subscribeOnStateData();
  }

  loadInitialData(): void {
    this.store.dispatch(new NotesListActions.LoadNotesStart());
  }

  /**
   * Subscribes on state data that is needed in flat (not stream) shape.
   * Most of state streams are consumed via async pipe.
   * Added subscription here just to show approach
   * and avoid multiple template async pipe subscriptions on the same stream.
   */
  subscribeOnStateData(): void {
    const currentNoteSub = this.store.select(fromApp.selectCurrentNote)
      .subscribe(currentNote => {
        this.currentNote = currentNote;
      });
    this.subs.push(currentNoteSub);
  }

  onAddNoteClick(): void {
    // Reset search string automatically so that new note is shown
    this.store.dispatch(new SearchParamsActions.UpdateSearchByKeywords({ searchByKeywords: [] }));
    this.store.dispatch(new NotesListActions.AddNote());
  }

  onNoteSelect(noteId: Note['id']): void {
    this.store.dispatch(new NotesListActions.SelectNote({ noteId }));
  }

  onSearchByKeywordsUpdate(searchByKeywords: Array<string>): void {
    this.store.dispatch(new SearchParamsActions.UpdateSearchByKeywords({ searchByKeywords }));
  }

  onNoteUpdate(event: {
    noteId: Note['id'];
    partialUpdates: PartialNoteUpdates
  }): void {
    this.store.dispatch(new NotesListActions.UpdateNote(event));
  }

  onNoteSave(note: Note): void {
    // Convert to raw
    const { isSaved, ...rawNote } = note;
    this.store.dispatch(new NotesListActions.SaveNoteStart({ note: rawNote }));
  }

  onNoteDelete(note: Note): void {
    // Convert to raw and extrace is saved flag for action creator
    const { isSaved, ...rawNote } = note;
    this.store.dispatch(new NotesListActions.DeleteNoteStart({
      note: rawNote,
      noteIsSaved: isSaved,
    }));
  }

  /**
   * Clean up subscriptions.
   * Not needed in root components since it lives always.
   * Added just to show approach.
   */
  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe);
    }
  }
}
