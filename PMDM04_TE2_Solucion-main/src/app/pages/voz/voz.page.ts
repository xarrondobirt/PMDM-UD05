import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-voz',
  templateUrl: './voz.page.html',
  styleUrls: ['./voz.page.scss'],
})
export class VozPage implements OnInit {

  recording = false;
  photo: string | null | undefined = null; // Guardar la URL de la foto

  constructor() { 
    SpeechRecognition.requestPermissions();
  }

  ngOnInit() {
  }
  async startRecognition() {
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'en-US',
    });

    SpeechRecognition.addListener ('partialResults', (data:any) => {
      console.log('partialResults was fired', data.matches);
      console.log('Posición 0: ', data.matches[0]);

      if (data.matches[0]?.toLowerCase() === 'foto' || data.matches[0]?.toLowerCase() === 'photo') {
        this.takePhoto();
      }
    });
    }
  }

  async stopRecognition() {
    this.recording =false;
    await SpeechRecognition.stop();
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri, // Cambiar a Uri para obtener una URL
        source: CameraSource.Camera, // Usar la cámara
      });
      this.photo = image.webPath || null; // Usar webPath como la URL de la foto
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async sharePhoto() {
    if (this.photo) {
      try {
        await Share.share({
          title: 'Mira esta foto',
          text: 'Te comparto una foto que tomé',
          url: this.photo, // Usar la URL del archivo
          dialogTitle: 'Compartir Foto',
        });
      } catch (error) {
        console.error('Error al compartir la foto:', error);
      }
    } else {
      console.warn('No hay foto para compartir');
    }
  }
}
