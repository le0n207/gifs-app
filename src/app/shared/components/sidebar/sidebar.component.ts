import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public tagsHistoryService: string[] = [];

  constructor(private gifsService:GifsService){
    this.tagsHistoryService = gifsService.tagHistory;
  }

  get tags(){
    return this.gifsService.tagHistory;
  }
}
