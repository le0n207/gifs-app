import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit {
  // Se inicializa el input para que la variable gif sea tomada en el HTML
  @Input()
  public gif!:Gif;

  //Como no hay forma de saber si tiene datos se inicializa un error en el OnInit para que detecte el error
  ngOnInit(): void {
    if (!this.gif)  throw new Error('Gif error');

  }
}
