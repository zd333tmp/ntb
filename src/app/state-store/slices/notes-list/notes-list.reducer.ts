import nanoid = require('nanoid');
import { DateTime } from 'luxon';
import { RawNote } from '../../../services/raw-note.interface';
import { NotesListState } from './notes-list-state.interface';
import { notesListInitialState } from './notes-list-initial-state';
import * as NotesListActions from './notes-list.actions';

const DEFAULT_NOTE_CAPTION = 'New Note';

export function notesListReducer(
  state: NotesListState = notesListInitialState,
  action: NotesListActions.All
): NotesListState {
  switch (action.type) {
    case NotesListActions.LOAD_NOTES_START: {
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined,
      };
    }
    case NotesListActions.LOAD_NOTES_SUCCESS: {
      const { notes } = action.payload;
      const savedEntities = notes.reduce(
        (entities: { [id: string]: RawNote }, note: RawNote) => ({ ...entities, [note.id]: note, }),
        {}
      );

      return {
        ...state,
        savedEntities,
        isLoading: false,
        loaded: true,
      };
    }
    case NotesListActions.LOAD_NOTES_ERROR: {
      const { errorMessage } = action.payload;

      return {
        ...state,
        errorMessage,
        isLoading: false,
      };
    }
    case NotesListActions.SELECT_NOTE: {
      const selectedNoteId = action.payload.noteId;
      return {
        ...state,
        selectedNoteId,
      };
    }
    case NotesListActions.ADD_NOTE: {
      // Generate new id
      const id = nanoid();
      // Make new note selected automatically
      const selectedNoteId = id;
      // Use current time as note time stamp
      const timeStamp = DateTime.local().toISO();
      const newNote: RawNote = {
        id,
        timeStamp,
        caption: DEFAULT_NOTE_CAPTION,
        text: '',
        keywords: [],
      };
      const unsavedEntities = {
        ...state.unsavedEntities,
        [id]: newNote,
      };

      return {
        ...state,
        unsavedEntities,
        selectedNoteId,
      };
    }
    case NotesListActions.UPDATE_NOTE: {
      const id = action.payload.noteId;
      // Allow edit only unsaved notes
      const noteToUpdate = state.unsavedEntities[id];

      if (!noteToUpdate) {
        return state;
      }
      const { partialUpdates } = action.payload;
      // Partial merge works fine since note has no nested properties
      const updatedNote = { ...noteToUpdate, ...partialUpdates};
      const unsavedEntities = {
        ...state.unsavedEntities,
        [id]: updatedNote,
      };

      return {
        ...state,
        unsavedEntities,
      };
    }
    case NotesListActions.SAVE_NOTE_START: {
      return {
        ...state,
        isSaving: true,
        errorMessage: undefined,
      };
    }
    case NotesListActions.SAVE_NOTE_SUCCESS: {
      const savedNoteId = action.payload.noteId;
      // Remove note from unsaved entities dict
      const { [savedNoteId]: savedNote, ...unsavedEntities } = state.unsavedEntities;
      // Add note to saved entities dict
      const savedEntities = {
        ...state.savedEntities,
        [savedNoteId]: savedNote,
      };

      return {
        ...state,
        isSaving: false,
        savedEntities,
        unsavedEntities,
      };
    }
    case NotesListActions.SAVE_NOTE_ERROR: {
      const { errorMessage } = action.payload;

      return {
        ...state,
        errorMessage,
        isSaving: false,
      };
    }
    case NotesListActions.DELETE_NOTE_START: {
      const { id } = action.payload.note;
      const selectedNoteId = (id === state.selectedNoteId)
        ? undefined
        : state.selectedNoteId;
      // Make optimistic updates
      let savedEntities: NotesListState['savedEntities'];
      let unsavedEntities: NotesListState['unsavedEntities'];

      if (action.payload.noteIsSaved) {
        // Remove note from saved list
        const { [id]: removedFromSavedEntities, ...saved } = state.savedEntities;

        savedEntities = saved;
        unsavedEntities = state.unsavedEntities;
      } else {
        // Remove note from unsaved list
        const { [id]: removedFromUnsavedEntities, ...unsaved } = state.unsavedEntities;

        unsavedEntities = unsaved;
        savedEntities = state.savedEntities;
      }
      return {
        ...state,
        selectedNoteId,
        savedEntities,
        unsavedEntities,
        isSaving: true,
        errorMessage: undefined,
      };
    }
    case NotesListActions.DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        isSaving: false,
      };
    }
    case NotesListActions.DELETE_NOTE_ERROR: {
      const { errorMessage, noteIsSaved, note} = action.payload;
      // Revert optimistic updates
      const savedEntities = noteIsSaved
        ? { ...state.savedEntities, [note.id]: note }
        : state.savedEntities;
      const unsavedEntities = noteIsSaved
        ? state.unsavedEntities
        : { ...state.unsavedEntities, [note.id]: note };

      return {
        ...state,
        errorMessage,
        savedEntities,
        unsavedEntities,
        isSaving: false,
      };
    }
    default: {
      return state;
    }
  }
}
