import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
//El provideIn: 'root' hace que totalmente el servicio este disponible a lo largo de toda aplicacion y todos los modulos que inyecte este servicio
export class GifsService {

  public gifList: Gif[] = [];

  //Propiedad para ir almacenando todos los tags
  private _tagsHistory: string[] = [];
  private apiKey:     string = 'LlmxJhqWqVLz31QHcTmK89Z8wla1Xtnq';
  private serviceUrl: string= 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string) {
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse (localStorage.getItem('history')!);

  }


  //async searchTag( tag: string ):Promise<void> {
    searchTag( tag:string ):void {
    if ( tag.length === 0 ) return ;
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '15')
      .set('q', tag)


    //Observable
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe( resp => {

      this.gifList = resp.data;
      //console.log({gifs: this.gifList});

    })

    //ejemplo de una forma con fetch
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=LlmxJhqWqVLz31QHcTmK89Z8wla1Xtnq&q=valorant&limit=15')
      //.then( resp => resp.json() )
      //.then( data => console.log(data) );
      //console.log(this.tagsHistory);
  }

}
