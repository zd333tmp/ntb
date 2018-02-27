import { createSelector } from '@ngrx/store';
import { RawNote } from '../../services/raw-note.interface';
import { Note } from './note.interface';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';
import { SearchParamsState } from '../slices/search-params/search-params-state.interface';
import * as fromApp from '.';

export function getMatchingNotes(
  notesListState: NotesListState,
  savedRawNotes: Array<RawNote>,
  searchParamsState: SearchParamsState
): Array<Note> {

  const unsaved: Array<Note> = (notesListState && notesListState.unsavedEntities)
    ? Reflect.ownKeys(notesListState.unsavedEntities)
      .map(key => ({ ...notesListState.unsavedEntities[key], isSaved: false}))
    : [];
  const saved: Array<Note> = (savedRawNotes || [])
    .map(rawNote => ({ ...rawNote, isSaved: true}));
  const merged = [ ...saved, ...unsaved ];
  const searchWords = searchParamsState && searchParamsState.searchByKeywords.map(word => word.toLocaleLowerCase());

  if (!searchWords || !searchWords.length) {
    return merged;
  }
  return merged.filter(note => {
    const loweredKeyWords = note.keywords.map(w => w.toLocaleLowerCase());

    return searchWords.some(searchWord => loweredKeyWords.includes(searchWord));
  });
}

export const selectMatchingNotes = createSelector(
  fromApp.selectNotesListState,
  fromApp.selectSavedRawNotes,
  fromApp.selectSearchParamsState,
  getMatchingNotes
);
