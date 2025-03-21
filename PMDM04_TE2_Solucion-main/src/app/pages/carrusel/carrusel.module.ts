import { MisComponentesModule } from './../../components/mis-componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

import { CarruselPageRoutingModule } from './carrusel-routing.module';
import { CarruselPage } from './carrusel.page';

register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarruselPageRoutingModule,
    MisComponentesModule
  ],
  declarations: [CarruselPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarruselPageModule {}
