import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string,
  marker?: mapboxgl.Marker,
  centro?: [number, number] 
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
      .mapa-container {
      width: 100%;
      height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  //Está asociado a la referencia local del HTML definida con #mapa
  @ViewChild('mapa') divMapa!: ElementRef; //Sirve para tomar un elemento del HTML y poder utilizarlo en el ts

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-60.33394486106813, -33.232141941142835];

  //Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,//'YOUR_CONTAINER_ELEMENT_ID', --> id del elemento HTML donde voy a renderizar el mapa (o directamente el DIV)
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.center, //Donde quiero centrar el mapa cuando se abre inicialmente
      zoom: this.zoomLevel //Zoom que le doy inicialmente
    });

    const markerElement: HTMLElement = document.createElement('div');
    markerElement.innerHTML = 'Hola mundo!';

    //Marcador personalizado (estático)
    // new mapboxgl.Marker({
    //   element: markerElement
    // })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

    //Marcador por defecto (estático)
    new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.leerMarcadoresDeLocalStorage();
  }

  agregarMarcador() {
    //Genera color hexadecimal aleatorio
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color: color, 
      marker: nuevoMarcador
    });

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresEnLocalStorage();
    });

    this.guardarMarcadoresEnLocalStorage();
  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  }

  guardarMarcadoresEnLocalStorage() {
    const lngLatArray: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArray.push({
        color: color,
        centro: [lng, lat]
      });

      localStorage.setItem('marcadores', JSON.stringify(lngLatArray));
    });

    if (lngLatArray.length === 0) {
      localStorage.removeItem('marcadores');
    }
  }

  leerMarcadoresDeLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);
    
      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresEnLocalStorage();
      });
    });
  }

  borrarMarcador(indice: number) {
    this.marcadores[indice].marker?.remove(); //Elkmina del mapa
    this.marcadores.splice(indice, 1); //Elimina del array
    this.guardarMarcadoresEnLocalStorage();
  }
}
