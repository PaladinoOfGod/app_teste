import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CloudProvider {
  files:any = [
    { url: 'https://deusvult-ti.com.br/alma_app/audios/If%20You%20Official%20Video.mp3',
      name: 'If You Official Video'
    },
    {
      url: 'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
      name: 'Man Atkeya Beparwah by Nusrat Fateh Ali Khan'
    },
    { url: 'https://deusvult-ti.com.br/alma_app/audios/Cant%20get%20over.mp3',
      name: 'Cant get over - Kassinão'
    }
  ];
  getFiles() {
   return of(this.files);
  }
}
