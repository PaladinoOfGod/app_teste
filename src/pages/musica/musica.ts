import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Content, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { AudioProvider } from '../../providers/audio/audio';
import { CloudProvider } from '../../providers/cloud/cloud';
import { Store } from '@ngrx/store';
import { pluck, filter, map, distinctUntilChanged } from 'rxjs/operators';
import { RESET, CANPLAY, LOADEDMETADATA, PLAYING, TIMEUPDATE, LOADSTART } from '../../providers/store/store';

/**
 * Generated class for the MusicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-musica',
  templateUrl: 'musica.html',
})
export class MusicaPage {
  files: any = [];
  seekbar: FormControl = new FormControl("seekbar");
  state: any = {};
  onSeekState: boolean;
  currentFile: any = {};
  displayFooter: string = "inactive";
  loggedIn: Boolean;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audioProvider: AudioProvider,
    public loadingCtrl: LoadingController,
    public cloudProvider: CloudProvider,
    private store: Store<any>
  ) {
    //this.getDocuments();
  }

  ionViewDidLoad(){
    this.getDocuments();
  }

  getDocuments() {
    let loader = this.presentLoading();
    this.cloudProvider.getFiles().subscribe(files => {
      this.files = files;
      loader.dismiss();
    });
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Content. Please Wait...'
    });
    loading.present();
    return loading;
  }

  ionViewWillLoad() {
    this.store.select('appState').subscribe((value: any) => {
      this.state = value.media;
    });

    // Resize the Content Screen so that Ionic is aware of footer
    this.store
      .select('appState')
      .pipe(pluck('media', 'canplay'), filter(value => value === true))
      .subscribe(() => {
        this.displayFooter = 'active';
        this.content.resize();
      });

    // Updating the Seekbar based on currentTime
    this.store
      .select('appState')
      .pipe(
        pluck('media', 'timeSec'),
        filter(value => value !== undefined),
        map((value: any) => Number.parseInt(value)),
        distinctUntilChanged()
      )
      .subscribe((value: any) => {
        this.seekbar.setValue(value);
      });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.playStream(file.url);

    localStorage.setItem('indexUltimaMusicaTocada', index);

  }

  resetState() {
    this.audioProvider.stop();
    this.store.dispatch({ type: RESET });
  }

  playStream(url) {
    this.resetState();
    this.audioProvider.playStream(url).subscribe(event => {
      const audioObj = event.target;

      switch (event.type) {
        case 'canplay':
          return this.store.dispatch({ type: CANPLAY, payload: { value: true } });

        case 'loadedmetadata':
          return this.store.dispatch({
            type: LOADEDMETADATA,
            payload: {
              value: true,
              data: {
                time: this.audioProvider.formatTime(
                  audioObj.duration * 1000,
                  'HH:mm:ss'
                ),
                timeSec: audioObj.duration,
                mediaType: 'mp3'
              }
            }
          });

        case 'playing':
          return this.store.dispatch({ type: PLAYING, payload: { value: true } });

        case 'pause':
          return this.store.dispatch({ type: PLAYING, payload: { value: false } });

        case 'timeupdate':
          return this.store.dispatch({
            type: TIMEUPDATE,
            payload: {
              timeSec: audioObj.currentTime,
              time: this.audioProvider.formatTime(
                audioObj.currentTime * 1000,
                'HH:mm:ss'
              )
            }
          });

        case 'loadstart':
          return this.store.dispatch({ type: LOADSTART, payload: { value: true } });
      }
    });
  }

  pause() {
    this.audioProvider.pause();
  }

  play() {
    this.audioProvider.play();
  }

  stop() {
    this.audioProvider.stop();
  }

  next() {
    debugger;
    let index = parseInt(localStorage.getItem('indexUltimaMusicaTocada')) + 1;
    //let index = this.currentFile.index + 1;
    let file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    debugger;
    let index = parseInt(localStorage.getItem('indexUltimaMusicaTocada')) - 1;
    //let index = this.currentFile.index + 1;
    let file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSeekStart() {
    this.onSeekState = this.state.playing;
    if (this.onSeekState) {
      this.pause();
    }
  }

  onSeekEnd(event) {
    if (this.onSeekState) {
      this.audioProvider.seekTo(event.value);
      this.play();
    } else {
      this.audioProvider.seekTo(event.value);
    }
  }


  reset() {
    this.resetState();
    this.currentFile = {};
    this.displayFooter = "inactive";
  }

}
