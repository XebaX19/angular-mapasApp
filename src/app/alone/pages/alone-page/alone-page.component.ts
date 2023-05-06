import { Component, OnInit } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';

//El componente "standalone" no necesita ser importado en ningún lugar...es su propio módulo
//Es una pieza que está flotando en Angular y la puedo usar donde la necesite (realizando la importación correspondiente)
//Se maneja muy similar a un "módulo"

@Component({
  standalone: true,
  imports: [ CounterAloneComponent ],
  templateUrl: './alone-page.component.html',
  styles: [
  ]
})
export class AlonePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
