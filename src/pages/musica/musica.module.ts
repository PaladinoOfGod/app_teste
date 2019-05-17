import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicaPage } from './musica';

@NgModule({
  declarations: [
    MusicaPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicaPage),
  ],
})
export class MusicaPageModule {}
