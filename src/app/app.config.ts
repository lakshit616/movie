import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; //  important
import { firebaseProviders } from './firebase-config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //  this line is required for HttpClient to work!
    provideRouter(routes),
    firebaseProviders
  ]
};
