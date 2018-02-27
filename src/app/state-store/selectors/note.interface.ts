import { RawNote } from '../../services/raw-note.interface';

/**
 * Note view model.
 * Has structure and properties
 * that make it convenient to process in views (presentational components).
 * All properties are readonly for immutability purposes.
 */
export interface Note extends RawNote {
  /**
   * Indicates if note is saved on back-end.
   */
  readonly isSaved: boolean;
}
