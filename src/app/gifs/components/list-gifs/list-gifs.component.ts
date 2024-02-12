import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'list-gifs',
  templateUrl: './list-gifs.component.html',
  styleUrls: ['./list-gifs.component.css']
})
export class ListGifsComponent {
  @Input()
  public gifs: Gif[] = [];
}
