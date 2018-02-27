import { createSelector } from '@ngrx/store';
import { Note } from './note.interface';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';
import * as fromApp from '.';

export function getCurrentNote(
  notesListState: NotesListState,
  matchingNotes: Array<Note>,
): Note {
  if (
    !notesListState || !notesListState.selectedNoteId
    || !matchingNotes
  ) {
    return undefined;
  }
  const { selectedNoteId } = notesListState;
  // Return current note only if it matches search params (sits in current matching notes list)
  return matchingNotes.find(note => note.id === selectedNoteId);
}

export const selectCurrentNote = createSelector(
  fromApp.selectNotesListState,
  fromApp.selectMatchingNotes,
  getCurrentNote
);
