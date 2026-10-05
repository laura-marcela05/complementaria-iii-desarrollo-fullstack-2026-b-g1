import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// provideHttpClient() es lo que habilita las peticiones HTTP.
// Sin esta linea, inyectar HttpClient en el componente da error.
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
