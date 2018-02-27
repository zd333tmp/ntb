import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RawNote } from './raw-note.interface';

@Injectable()
export class NotesConnectorService {

  private apiKey = environment.config.apiKey;
  private apiUrl = environment.config.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getNotes(): Observable<Array<RawNote>> {
    return this.httpClient.get(`${this.apiUrl}${this.apiKey}`).pipe(
      map((response: any) => {
        if (response && (response.results instanceof Array)) {
          return response.results as Array<RawNote>;
        }
        throw new Error('Unexpected response structure');
      })
    );
  }

  saveNewNote(newNote: RawNote, savedNotes: Array<RawNote>): Observable<any> {
    const notes = [ ...savedNotes, newNote ];

    return this.setNotes(notes);
  }

  deleteNote(noteToDelete: RawNote, savedNotes: Array<RawNote>): Observable<any> {
    const notes = savedNotes.filter(note => note.id !== noteToDelete.id);

    return this.setNotes(notes);
  }

  private setNotes(notes: Array<RawNote>): Observable<any> {
    const data = { results: notes };

    return this.httpClient.put(`${this.apiUrl}${this.apiKey}`, { results: notes });
  }



}
