import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {
  public gifsList:Gif[] = [];

  private apiKey:string = '7D14n5drEpvFtUPX36anEx23w5vWpgKW';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];
  constructor(private http:HttpClient) { this.loadLocalStorage() }

  get tagHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory[0].length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string){
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp => {
      console.log(resp.data);
      this.gifsList = resp.data;
    });


    //Manera sin el modulo Http
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=7D14n5drEpvFtUPX36anEx23w5vWpgKW&q=Valorant&limit=10')
    // .then( resp => resp.json() )
    // .then( data => console.log(data));
  }
}
