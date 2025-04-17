// src/app/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private tagKey = 'tags';
  private noteKey = 'notes'; 

  constructor() {}

  // ========== TAGS ==========
  //recupere la valeur enregistrée sous la clé 
  getTags(): string[] {
    const data = localStorage.getItem(this.tagKey);
    return data ? JSON.parse(data) : [];
  }
//enregesitre les tags dans le local
  saveTags(tags: string[]) {
    localStorage.setItem(this.tagKey, JSON.stringify(tags));
  }

  addTag(tag: string) {
    const tags = this.getTags();
    if (!tags.includes(tag)) {
      tags.push(tag);
      this.saveTags(tags);
    }
  }

  removeTag(tag: string) {
    const tags = this.getTags().filter(t => t !== tag);
    this.saveTags(tags);
  }

  // ========== NOTES ==========
  // recupere les notes depuis le stockage local
  getNotes(): any[] {
    const data = localStorage.getItem(this.noteKey);
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return parsed.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
      }));
    } catch {
      return [];
    }
  }
 //enregistre un tableau de notes sans le stockage local
  saveNotes(notes: any[]) {
    localStorage.setItem(this.noteKey, JSON.stringify(notes));
  }
 // supprime les notes 
  clearNotes() {
    localStorage.removeItem(this.noteKey);
  }
}
