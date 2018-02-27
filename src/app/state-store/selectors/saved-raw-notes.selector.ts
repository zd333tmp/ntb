import { createSelector } from '@ngrx/store';
import { RawNote } from '../../services/raw-note.interface';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';
import * as fromApp from '.';

export function getSavedRawNotes(notesListState: NotesListState): Array<RawNote> {
  if (!notesListState || !notesListState.savedEntities) {
    return [];
  }
  return Reflect.ownKeys(notesListState.savedEntities)
    .map(key => notesListState.savedEntities[key]);
}

export const selectSavedRawNotes = createSelector(
  fromApp.selectNotesListState,
  getSavedRawNotes
);
