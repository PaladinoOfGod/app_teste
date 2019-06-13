import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PlaylistItemComponent } from './playlist-item/playlist-item';

@NgModule({
	declarations: [PlaylistItemComponent],
	imports: [IonicModule],
	exports: [PlaylistItemComponent]
})
export class ComponentsModule { }
