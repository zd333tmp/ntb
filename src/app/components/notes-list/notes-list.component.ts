import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Note } from '../../state-store/selectors/note.interface';

/**
 * Dumb component that shows list of notes and handles note selection.
 */
@Component({
  selector: 'ntb-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent {
  @Input() notes: Array<Note>;
  @Input() selectedNoteId: Note['id'];
  @Output() selectNote = new EventEmitter<Note['id']>();

  trackNoteBy(note: Note): Note['id'] {
    return note && note.id;
  }

  getNoteIsSelected(note: Note): boolean {
    if (!this.selectedNoteId) {
      return false;
    }
    return note.id === this.selectedNoteId;
  }

  onNoteClick(note: Note): void {
    if (!note) {
      return;
    }
    this.selectNote.emit(note.id);
  }
}
