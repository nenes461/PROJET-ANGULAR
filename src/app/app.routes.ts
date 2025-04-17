import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  { path: 'tags', component: TagsComponent },  // Route pour afficher TagsComponent
  { path: 'notes', component: NotesComponent },  // Route pour afficher NotesComponent

];
