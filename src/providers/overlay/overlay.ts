import { Injectable } from '@angular/core';
import { ToastController, ToastOptions, Toast } from 'ionic-angular';

@Injectable()
export class OverlayProvider {

  constructor(
    public toastCtrl: ToastController
  ) {}

  toast(options?: ToastOptions): Toast {
    const toast = this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      ...options
    });
    toast.present();
    return toast;
  }

}
