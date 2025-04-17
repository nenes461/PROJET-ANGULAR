import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service'; // ← corrige le chemin selon ta structure

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  color: string;
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  notes: Note[] = [];
  editing: Note | null = null;

  constructor(private storage: StorageService) {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.storage.getNotes().map(n => ({
      ...n,
      createdAt: new Date(n.createdAt),
      color: n.color || '#f2f2f2'
    }));
    
    
  }

  saveNotes() {
    this.storage.saveNotes(this.notes);
  }

  dialogAddNote() {
    this.editing = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date(),
      color: '#f2f2f2',
    };
  }

  editNote(note: Note) {
    this.editing = { ...note };
  }

  cancelEdit() {
    this.editing = null;
  }

  submitNoteForm() {
    if (!this.editing) return;

    const index = this.notes.findIndex(n => n.id === this.editing!.id);
    if (index >= 0) {
      this.notes[index] = this.editing;
    } else {
      this.notes.push(this.editing);
    }

    this.saveNotes();
    this.cancelEdit();
  }

  removeNote(note: Note) {
    this.notes = this.notes.filter(n => n.id !== note.id);
    this.saveNotes();
  }

  clearAllNotes() {
    this.notes = [];
    this.storage.clearNotes();
  }
}
