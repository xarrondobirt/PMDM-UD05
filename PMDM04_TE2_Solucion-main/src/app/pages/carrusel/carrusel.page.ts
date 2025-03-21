import { CamaraService } from './../../servicios/camara.service';
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.page.html',
  styleUrls: ['./carrusel.page.scss'],
})
export class CarruselPage implements OnInit {

  options={
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true,
    speed: 400
   }; 

  constructor(public usarCamara: CamaraService) { }

  ngOnInit() {
  }

  // Función para compartir una imagen
  async compartirImagen(imagen: string) {
    console.log('Intentando compartir la imagen:', imagen);  // Verifica si el parámetro 'imagen' es correcto
    console.log('Intentando compartir la imagen:', Capacitor.convertFileSrc(imagen));  // Verifica si el parámetro 'imagen' es correcto
    try {
      await Share.share({
        title: 'Compartir Foto',
        text: '¡Mira esta foto!',
        url: imagen,  // URL de la imagen a compartir
        dialogTitle: 'Compartir foto',  // Título del diálogo de compartir
      });
      console.log('Imagen compartida exitosamente');
    } catch (error) {
      console.error('Error al compartir la imagen', error);
    }
  }

}
