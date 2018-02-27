import { Action } from '@ngrx/store';
import { RawNote } from '../../../services/raw-note.interface';

export const LOAD_NOTES_START = '[Notes list] Load notes start';
export const LOAD_NOTES_SUCCESS = '[Notes list] Load notes success';
export const LOAD_NOTES_ERROR = '[Notes list] Load notes error';

export const SELECT_NOTE = '[Notes list] Select note';

export const ADD_NOTE = '[Notes list] Add note';
export const UPDATE_NOTE = '[Notes list] Update note';

export const SAVE_NOTE_START = '[Notes list] Save note start';
export const SAVE_NOTE_SUCCESS = '[Notes list] Save note success';
export const SAVE_NOTE_ERROR = '[Notes list] Save note error';

export const DELETE_NOTE_START = '[Notes list] Delete note start';
export const DELETE_NOTE_SUCCESS = '[Notes list] Delete note success';
export const DELETE_NOTE_ERROR = '[Notes list] Delete note error';

export class LoadNotesStart implements Action {
  readonly type = LOAD_NOTES_START;
}
export class LoadNotesSuccess implements Action {
  readonly type = LOAD_NOTES_SUCCESS;
  constructor(public payload: { notes: Array<RawNote> }) { }
}
export class LoadNotesError implements Action {
  readonly type = LOAD_NOTES_ERROR;
  constructor(public payload: { errorMessage: string }) { }
}
export class SelectNote implements Action {
  readonly type = SELECT_NOTE;
  constructor(public payload: { noteId: RawNote['id'] }) { }
}
export class AddNote implements Action {
  readonly type = ADD_NOTE;
}
export class UpdateNote implements Action {
  readonly type = UPDATE_NOTE;
  constructor(public payload: {
    noteId: RawNote['id'];
    partialUpdates: PartialNoteUpdates;
  }) { }
}
export class SaveNoteStart implements Action {
  readonly type = SAVE_NOTE_START;
  constructor(public payload: { note: RawNote }) { }
}
export class SaveNoteSuccess implements Action {
  readonly type = SAVE_NOTE_SUCCESS;
  constructor(public payload: { noteId: RawNote['id'] }) { }
}
export class SaveNoteError implements Action {
  readonly type = SAVE_NOTE_ERROR;
  constructor(public payload: { errorMessage: string }) { }
}
export class DeleteNoteStart implements Action {
  readonly type = DELETE_NOTE_START;
  constructor(public payload: {
    note: RawNote;
    noteIsSaved: boolean;
  }) { }
}
export class DeleteNoteSuccess implements Action {
  readonly type = DELETE_NOTE_SUCCESS;
}
export class DeleteNoteError implements Action {
  readonly type = DELETE_NOTE_ERROR;
  constructor(public payload: {
    note: RawNote,
    noteIsSaved: boolean,
    errorMessage: string
  }) { }
}

export type PartialNoteUpdates = Partial<Pick<RawNote, 'caption' | 'text' | 'keywords' | 'timeStamp'>>;

export type All =
  | LoadNotesStart
  | LoadNotesSuccess
  | LoadNotesError
  | SelectNote
  | AddNote
  | UpdateNote
  | SaveNoteStart
  | SaveNoteSuccess
  | SaveNoteError
  | DeleteNoteStart
  | DeleteNoteSuccess
  | DeleteNoteError
  ;
