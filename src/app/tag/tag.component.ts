import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() color: string = '#cccccc'; // string rgb()
}
