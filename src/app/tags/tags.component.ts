import { Component } from '@angular/core';
import { NgIf,  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

interface Tag {
  id: number;
  name: string;
  color: RGBColor;
}

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgIf,  FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  tags: Tag[] = [
    { id: 1, name: 'Urgent', color: { r: 255, g: 0, b: 0 } },
    { id: 2, name: 'Perso', color: { r: 0, g: 255, b: 0 } },
    { id: 3, name: 'Travail', color: { r: 0, g: 0, b: 255 } }
  ];

  editing: Tag | null = null;

  addTag(tag: Tag) {
    tag.id = this.generateId();
    this.tags.push(tag);
  }

  editTag(tag: Tag) {
    this.editing = {
      id: tag.id,
      name: tag.name,
      color: { ...tag.color }
    };
  }

  dialogAddTag() {
    this.editing = {
      id: 0,
      name: '',
      color: { r: 200, g: 200, b: 200 }
    };
  }

  cancelEdit() {
    this.editing = null;
  }

  submitTagForm() {
    if (!this.editing) return;

    if (this.editing.id === 0) {
      this.addTag(this.editing);
    } else {
      const index = this.tags.findIndex(t => t.id === this.editing!.id);
      if (index !== -1) {
        this.tags[index] = { ...this.editing };
      }
    }
    this.editing = null;
  }

  removeTag(tag: Tag) {
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }

  generateId(): number {
    return this.tags.length > 0 ? Math.max(...this.tags.map(t => t.id)) + 1 : 1;
  }

  colorToCSS(c: RGBColor): string {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
}
