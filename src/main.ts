import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // ✅ app.ts ka correct path
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ✅ app.routes.ts ka correct path

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
