import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Está asociado a la referencia local del HTML definida con #mapa
  @ViewChild('mapa') divMapa!: ElementRef; //Sirve para tomar un elemento del HTML y poder utilizarlo en el ts
  
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-60.33394486106813, -33.232141941142835];

  constructor() { }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,//'YOUR_CONTAINER_ELEMENT_ID', --> id del elemento HTML donde voy a renderizar el mapa (o directamente el DIV)
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, //Donde quiero centrar el mapa cuando se abre inicialmente
      zoom: this.zoomLevel //Zoom que le doy inicialmente
    });

    //Regla de oro cuando escucho un listener con "on"...hay que eliminarlo cuando el componente se destruye

    //Al realizar zoom
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    //Al finalizar el zoom: restringir el zoom a 18
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    //Movimiento del mapa
    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      
      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    //Regla de oro cuando escucho un listener con "on"...hay que eliminarlo cuando el componente se destruye
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(+valor);
  }
}
