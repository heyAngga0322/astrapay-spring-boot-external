import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms'
import { INotes, INotesRequest } from "./interface";
import { Api } from './api';
import { MockApi } from './mock-api';

@Component({
  selector: 'note',
  imports: [ReactiveFormsModule],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note implements OnInit {
  constructor(private api: Api, private mockApi: MockApi) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    // Try real API first, fallback to mock API
    this.api.getNotes().subscribe({
      next: (notes: INotes[]) => {
        this.notes = notes;
      },
      error: (error) => {
        console.log('Real API failed, using mock API:', error.message);
        // Fallback to mock API
        this.mockApi.getNotes().subscribe({
          next: (notes: INotes[]) => {
            this.notes = notes;
          },
          error: (mockError) => {
            console.error('Both APIs failed:', mockError);
          }
        });
      }
    });
  }

  lastID: number = 0;
  notes: INotes[] = [];
  isEditing = false;
  editingNoteId: number | null = null;
  noteControl = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!\s$).+$/)]),
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?!\s$).+$/)])  
  });

  addNote() {
    if (this.noteControl.valid) {
      if (this.isEditing && this.editingNoteId) {
        this.updateNote();
      } else {
        this.lastID++;
        this.noteControl.patchValue({ id: this.lastID });
        const note: INotesRequest = {
          content: this.noteControl.get('content')?.value ?? '',
          title: this.noteControl.get('title')?.value ?? ''
        };      
        
        // Try real API first, fallback to mock API
        this.api.addNote(note).subscribe({
          next: (newNote) => {
            console.log('Note added successfully via real API:', newNote);
            this.resetForm();
            this.loadNotes();
          },
          error: (error) => {
            console.log('Real API failed, using mock API:', error.message);
            // Fallback to mock API
            this.mockApi.addNote(note).subscribe({
              next: (newNote) => {
                console.log('Note added successfully via mock API:', newNote);
                this.resetForm();
                this.loadNotes();
              },
              error: (mockError) => {
                console.error('Both APIs failed:', mockError);
              }
            });
          }
        });
      }
    }
  }

  updateNote() {
    if (this.noteControl.valid && this.editingNoteId) {
      const note: INotesRequest = {
        content: this.noteControl.get('content')?.value ?? '',
        title: this.noteControl.get('title')?.value ?? ''
      };      
      
      // Try real API first, fallback to mock API
      this.api.updateNote(this.editingNoteId, note).subscribe({
        next: (updatedNote) => {
          console.log('Note updated successfully via real API:', updatedNote);
          this.resetForm();
          this.loadNotes();
        },
        error: (error) => {
          console.log('Real API failed, using mock API:', error.message);
          // Fallback to mock API
          this.mockApi.updateNote(this.editingNoteId!, note).subscribe({
            next: (updatedNote) => {
              console.log('Note updated successfully via mock API:', updatedNote);
              this.resetForm();
              this.loadNotes();
            },
            error: (mockError) => {
              console.error('Both APIs failed:', mockError);
            }
          });
        }
      });
    }
  }

  editNote(note: INotes) {
    this.isEditing = true;
    this.editingNoteId = note.id;
    this.noteControl.patchValue({
      id: note.id,
      title: note.title || '',
      content: note.content || ''
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.isEditing = false;
    this.editingNoteId = null;
    this.noteControl.reset();
  }

  removeNote(id: number) {
    // Try real API first, fallback to mock API
    this.api.deleteNote(id).subscribe({
      next: () => {
        console.log('Note deleted successfully via real API');
        this.loadNotes();
      },
      error: (error) => {
        console.log('Real API failed, using mock API:', error.message);
        // Fallback to mock API
        this.mockApi.deleteNote(id).subscribe({
          next: () => {
            console.log('Note deleted successfully via mock API');
            this.loadNotes();
          },
          error: (mockError) => {
            console.error('Both APIs failed:', mockError);
          }
        });
      }
    });
  }
}
