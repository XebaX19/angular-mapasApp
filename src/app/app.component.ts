import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapasApp';

  ngOnInit(): void {
    //Seteo el accessToken de Mapbox ni bien comienza la aplicación, así está disponible para todos los componentes
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }
}
