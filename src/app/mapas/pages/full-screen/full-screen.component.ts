import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa {
      width: 100%;
      height: 100%;
    }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let map = new mapboxgl.Map({
      container: 'mapa',//'YOUR_CONTAINER_ELEMENT_ID', --> id del elemento HTML donde voy a renderizar el mapa (un DIV)
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-60.33394486106813, -33.232141941142835], //Donde quiero centrar el mapa cuando se abre inicialmente
      zoom: 18 //Zoom que le doy inicialmente
    });
  }

}
