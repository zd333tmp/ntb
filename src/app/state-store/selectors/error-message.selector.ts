import { createSelector } from '@ngrx/store';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';
import * as fromApp from '.';

export function getErrorMessage(notesListState: NotesListState): string {
  return notesListState && notesListState.errorMessage;
}

export const selectErrorMessage = createSelector(
  fromApp.selectNotesListState,
  getErrorMessage
);
