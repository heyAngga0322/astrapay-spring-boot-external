import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { INotes, INotesRequest } from './interface';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<INotes[]>(`${this.apiUrl}/notes`);
  }

  addNote(note: INotesRequest) {
    return this.http.post<INotes>(`${this.apiUrl}/notes`, note);
  }

  updateNote(id:number, note: INotesRequest) {
    return this.http.put<INotes>(`${this.apiUrl}/notes/${id}`, note);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.apiUrl}/notes/${id}`);
  }
  
}
