import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string,
  tokenKey: string
}

export const appConfig: AppConfig = {
  apiUrl: 'http://localhost:3000',
  tokenKey: 'token'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');