import { createSelector } from '@ngrx/store';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';
import * as fromApp from '.';

export function getAllowSaveDelete(notesListState: NotesListState): boolean {
  return !!notesListState && !notesListState.isLoading && !notesListState.isSaving;
}

export const selectAllowSaveDelete = createSelector(
  fromApp.selectNotesListState,
  getAllowSaveDelete
);
