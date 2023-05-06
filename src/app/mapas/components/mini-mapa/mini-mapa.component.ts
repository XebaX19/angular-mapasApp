import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
    div {
      width: 100%;
      height: 150px;
      margin: 0px;
    }
  `]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,//'YOUR_CONTAINER_ELEMENT_ID', --> id del elemento HTML donde voy a renderizar el mapa (o directamente el DIV)
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat, //Donde quiero centrar el mapa cuando se abre inicialmente
      zoom: 15, //Zoom que le doy inicialmente
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);
  }

}
