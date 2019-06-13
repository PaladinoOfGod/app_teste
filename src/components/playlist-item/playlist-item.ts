import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'playlist-item',
  templateUrl: 'playlist-item.html'
})
export class PlaylistItemComponent {
  @Input() playlist: Playlist;
  @Output() selected = new EventEmitter<Playlist>();
}
