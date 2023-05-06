import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  ruta: string,
  nombre: string
}

@Component({
  standalone: true,
  selector: 'side-menu',
  templateUrl: './menu.component.html',
  imports: [ CommonModule, RouterModule ],
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
    {
      ruta: '/alone',
      nombre: 'Alone Page'
    }
  ];

}
