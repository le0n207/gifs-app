import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class GifsService {

  private apiKey:string = '7D14n5drEpvFtUPX36anEx23w5vWpgKW';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];
  constructor(private http:HttpClient) { }

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
  }

  searchTag(tag: string){
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    this.http.get(`${this.serviceUrl}/search?api_key=7D14n5drEpvFtUPX36anEx23w5vWpgKW&q=Valorant&limit=10`)
    .subscribe(resp => {
      console.log(resp);
    });


    //Manera sin el modulo Http
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=7D14n5drEpvFtUPX36anEx23w5vWpgKW&q=Valorant&limit=10')
    // .then( resp => resp.json() )
    // .then( data => console.log(data));
  }
}
