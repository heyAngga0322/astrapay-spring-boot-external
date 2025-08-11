import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { INotes, INotesRequest } from './interface';

@Injectable({
  providedIn: 'root'
})
export class MockApi {
  private notes: INotes[] = [
    { id: 1, title: 'Welcome Note', content: 'Welcome to your notes application!' },
    { id: 2, title: 'Sample Note', content: 'This is a sample note to get you started.' }
  ];
  private nextId = 3;

  getNotes(): Observable<INotes[]> {
    return of([...this.notes]).pipe(delay(500)); // Simulate network delay
  }

  addNote(note: INotesRequest): Observable<INotes> {
    const newNote: INotes = {
      id: this.nextId++,
      title: note.title || 'Untitled',
      content: note.content || ''
    };
    this.notes.push(newNote);
    return of(newNote).pipe(delay(300));
  }

  updateNote(id: number, note: INotesRequest): Observable<INotes> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notes[index] = { ...this.notes[index], ...note };
      return of(this.notes[index]).pipe(delay(300));
    }
    throw new Error('Note not found');
  }

  deleteNote(id: number): Observable<void> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    throw new Error('Note not found');
  }
}
