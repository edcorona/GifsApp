import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) {}

  //Como el servicio es privado se tiene que hacer un get
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag( tag: string ) {
    this.gifsService.searchTag( tag );
  }

}
