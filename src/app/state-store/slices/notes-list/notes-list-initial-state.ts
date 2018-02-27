import { NotesListState } from './notes-list-state.interface';

export const notesListInitialState: NotesListState = {
  savedEntities: {},
  unsavedEntities: {},
  selectedNoteId: undefined,
  isLoading: false,
  loaded: false,
  isSaving: false,
  errorMessage: undefined,
};
