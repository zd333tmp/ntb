import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { DateTime } from 'luxon';
import { Note } from '../../state-store/selectors/note.interface';
import { PartialNoteUpdates } from '../../state-store/slices/notes-list/notes-list.actions';

const DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Dumb component. Represents note details.
 * Allows editing only if note is not saved yet.
 * Could be separated into several components, but keep everything here for simplicity.
 * Could consist of classic form (with validation, submit functionality, etc.),
 * but notes should be lite/ad-hoc - thus no form, only some input elements
 * that always emit updates.
 */
@Component({
  selector: 'ntb-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteDetailsComponent {
  @Input() note: Note;
  @Input() allowSaveDelete: boolean;

  @Output() updateNote = new EventEmitter<{
    noteId: Note['id'];
    partialUpdates: PartialNoteUpdates
  }>();
  @Output() saveNote = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<Note>();

  getKeywordsInputValue(): string {
    if (!this.note || !this.note.keywords || !this.note.keywords.length) {
      return null;
    }
    return this.note.keywords.join(' ');
  }

  getDateInputValue(): string {
    if (!this.note || !this.note.timeStamp) {
      return null;
    }
    return DateTime.fromISO(this.note.timeStamp).toFormat(DATE_FORMAT);
  }

  private checkEditingIsAllowed(): boolean {
    return !!this.note && !this.note.isSaved;
  }

  onCaptionInput(event: any): void {
    if (
      !this.checkEditingIsAllowed
      || !event || !event.target
    ) {
      return;
    }
    const partialUpdates = { caption: event.target.value };

    this.emitUpdates(partialUpdates);
  }

  onTextInput(event: any): void {
    if (
      !this.checkEditingIsAllowed
      || !event || !event.target
    ) {
      return;
    }
    const partialUpdates = { text: event.target.value };

    this.emitUpdates(partialUpdates);
  }

  onKeywordsInput(event: any): void {
    if (
      !this.checkEditingIsAllowed
      || !event || !event.target
    ) {
      return;
    }
    const keywords = event.target.value
      ? event.target.value.split(' ')
      : [];
    const partialUpdates = { keywords };

    this.emitUpdates(partialUpdates);
  }

  onDateInput(event: any): void {
    if (
      !this.checkEditingIsAllowed
      || !event || !event.target
    ) {
      return;
    }

    const timeStamp = event.target.value
      ? DateTime.fromFormat(event.target.value, DATE_FORMAT).toISO()
      : null;
    const partialUpdates = { timeStamp };

    this.emitUpdates(partialUpdates);
  }

  private emitUpdates(partialUpdates: PartialNoteUpdates): void {
    const noteId = this.note.id;

    this.updateNote.emit({ noteId, partialUpdates} );
  }

  onSaveClick(): void {
    if (this.checkEditingIsAllowed) {
      this.saveNote.emit(this.note);
    }
  }

  onDeleteClick(): void {
    this.deleteNote.emit(this.note);
  }
}
