import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage implements AfterViewInit {
  private map: L.Map | null = null; // Variable para almacenar el mapa

  constructor() {}

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
  }
}
