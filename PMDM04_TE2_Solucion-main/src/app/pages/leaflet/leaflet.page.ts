import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage implements AfterViewInit {
  private map: L.Map | null = null; // Variable para almacenar el mapa

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      this.map?.invalidateSize(); // Ajusta el mapa después de renderizar
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.416775, -3.703790], 13);  // Coordenadas de Madrid, zoom

    // Añade una capa de tiles (mapa base)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // El marcador por defecto no se me ve en el emulador. He buscado esta configuración para que se vea correctamente.
    delete (L.Icon.Default.prototype as any)._getIconUrl; // Elimina la configuración por defecto

    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],    // Tamaño del icono
      iconAnchor: [12, 41],  // Punto de anclaje del icono
      popupAnchor: [1, -34], // Punto de anclaje del popup
    });

    // Añade un marcador
    L.marker([40.416775, -3.703790])
      .addTo(this.map)
      .bindPopup('¡Estás en Madrid!')
      .openPopup();

    // ----- Configuración de Leaflet Routing Machine -----
    const control = L.Routing.control({
      waypoints: [
        L.latLng(40.416775, -3.703790), // Punto de inicio (Madrid)
        L.latLng(40.417438, -3.693370)  // Punto de destino (Museo del Prado)
      ],
      routeWhileDragging: true, // Actualiza la ruta al mover waypoints
      show: false, // Panel de instrucciones
      lineOptions: {
        styles: [{ color: '#0066ff', weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10 // Estilo de la línea de ruta
      }
    }).addTo(this.map);

    // Elimina el contenedor de las instrucciones paso a paso
    setTimeout(() => {
      const container = document.querySelector('.leaflet-routing-container');
      if (container) container.remove();
    }, 100);
  }
}