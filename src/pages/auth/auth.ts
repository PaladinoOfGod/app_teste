import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { take } from 'rxjs/operators';

import { AuthProvider } from '../../providers/auth/auth';
import { OverlayProvider } from '../../providers/overlay/overlay';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl =
    new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private authService: AuthProvider,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayProvider
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Entrar' : 'Criar Conta';
    this.configs.actionChange = isSignIn ? 'Criar uma conta' : 'Já tenho uma conta';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  onSubmit(): void {
    const observable = this.configs.isSignIn
      ? this.authService.signin(this.authForm.value)
      : this.authService.signup(this.authForm.value);
    observable
      .pipe(take(1))
      .subscribe(
        user => this.navCtrl.setRoot('HomePage', null, {animate: true}),
        ({error: { message }}) => {
          this.overlayService.toast({
            message
          })
        }
      );
  }

}
