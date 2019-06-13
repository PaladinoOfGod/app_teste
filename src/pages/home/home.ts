import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { of, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthProvider } from '../../providers/auth/auth';
import { Playlist } from '../../models/playlist.model';
import { OverlayProvider } from '../../providers/overlay/overlay';
import { PlaylistProvider } from '../../providers/playlist/playlist';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  playlists$: Observable<Playlist[]> = of([]);

  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController,
    public overlay: OverlayProvider,
    public playlistService: PlaylistProvider
  ) { }

  ionViewCanEnter() {
    /*return this.authService.isAuthenticated
      .pipe(
        take(1)
      ).toPromise();*/
  }

  ionViewDidLoad() {
    const loading = this.overlay.loading();
    this.playlists$ = this.playlistService.getAll();
    this.playlists$
      .pipe(take(1))
      .subscribe(playlists => loading.dismiss());
  }

  onPlaylist({ _id }: Playlist): void {
    this.navCtrl.push('MusicaPage', {
      id: _id
    });
  }

}
