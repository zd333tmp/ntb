import { createFeatureSelector } from '@ngrx/store';
import { NotesListState } from '../slices/notes-list/notes-list-state.interface';

export const selectNotesListState = createFeatureSelector<NotesListState>('notesList');
