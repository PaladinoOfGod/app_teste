import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AppConfig, APP_CONFIG } from '../configs/config';
import { User } from '../../models/user.model';

@Injectable()
export class AuthProvider {
  private authState = new BehaviorSubject<boolean>(false);

  constructor(@Inject(APP_CONFIG) public appConfig: AppConfig, public http: HttpClient) {}

  get isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private setAuthState(token: string): void {
    this.authState.next(true);
    localStorage.setItem(this.appConfig.tokenKey, token);
  }

  signin(user: User): Observable<User> {
    return this.http.post<any>(`${this.appConfig.apiUrl}/signin`, user).pipe(
      tap(res => this.setAuthState(res.token)),
      map(res => res.user)
    );
  }

  signup(user: User): Observable<User> {
    return this.http.post<any>(`${this.appConfig.apiUrl}/signup`, user).pipe(
      tap(res => this.setAuthState(res.token)),
      map(res => res.user)
    );
  }

  logout(): void {
    this.authState.next(false);
    localStorage.removeItem(this.appConfig.tokenKey);
  }
}
