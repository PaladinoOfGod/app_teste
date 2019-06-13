import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { mediaStateReducer } from '../providers/store/store';
import { AudioProvider } from '../providers/audio/audio';
import { CloudProvider } from '../providers/cloud/cloud';

import { MyApp } from './app.component';
import { AuthService } from '../providers/auth0/auth.service';
import { IonicStorageModule } from '@ionic/storage';
import { MusicaPageModule } from '../pages/musica/musica.module';
import { AuthProvider } from '../providers/auth/auth';
import { APP_CONFIG, appConfig } from '../providers/configs/config';
import { OverlayProvider } from '../providers/overlay/overlay';
import { PlaylistProvider } from '../providers/playlist/playlist';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot({
      appState: mediaStateReducer
    }),
    IonicModule.forRoot(MyApp, {
      locationStrategy: 'hash'
    }),
    MusicaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    AudioProvider,
    CloudProvider,
    AuthService,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    { provide: APP_CONFIG, useValue: appConfig },
    OverlayProvider,
    PlaylistProvider
  ]
})
export class AppModule { }
