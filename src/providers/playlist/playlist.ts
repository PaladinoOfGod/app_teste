import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Playlist } from '../../models/playlist.model';
import { APP_CONFIG, AppConfig } from '../configs/config';

@Injectable()
export class PlaylistProvider {

  constructor(
    @Inject(APP_CONFIG) public appConfig: AppConfig,
    public http: HttpClient
  ) { }

  getAll(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(`${this.appConfig.apiUrl}/playlists`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(this.appConfig.tokenKey)
        }
      });
  }

  getById(id: string): Observable<Playlist> {
    return this.http
      .get<Playlist>(`${this.appConfig.apiUrl}/playlists/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(this.appConfig.tokenKey)
        }
      });
  }

}
