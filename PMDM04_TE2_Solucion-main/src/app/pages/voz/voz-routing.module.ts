import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VozPage } from './voz.page';

const routes: Routes = [
  {
    path: '',
    component: VozPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VozPageRoutingModule {}
