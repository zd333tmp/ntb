import { RawNote } from '../../../services/raw-note.interface';

/**
 * Contains all data related to notes list state slice.
 * All properties are readonly for immutability purposes.
 */
export interface NotesListState {
  readonly savedEntities: { [id: string]: RawNote };
  readonly unsavedEntities: { [id: string]: RawNote };
  readonly selectedNoteId: string;
  readonly isLoading: boolean;
  readonly loaded: boolean;
  readonly isSaving: boolean;
  readonly errorMessage: string;
}
