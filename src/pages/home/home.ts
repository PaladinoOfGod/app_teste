import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { tap, take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider
  ) { }

  ionViewCanEnter() {
    return this.authService.isAuthenticated
      .pipe(
        take(1)
      ).toPromise();
  }
}
