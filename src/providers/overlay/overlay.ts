import { Injectable } from '@angular/core';
import {
  ToastController,
  ToastOptions,
  Toast,
  LoadingOptions,
  LoadingController,
  Loading
} from 'ionic-angular';

@Injectable()
export class OverlayProvider {

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

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

  loading(options?: LoadingOptions): Loading {
    const loading = this.loadingCtrl.create({
      content: 'Loading content, please wait...',
      ...options
    });
    loading.present();
    return loading;
  }

}
