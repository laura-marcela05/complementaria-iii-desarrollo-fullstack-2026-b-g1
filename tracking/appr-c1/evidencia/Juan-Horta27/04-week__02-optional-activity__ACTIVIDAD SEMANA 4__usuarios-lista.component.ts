import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioTarjetaComponent } from './usuario-tarjeta.component';

// Forma que tienen los datos que devuelve la API
export interface Usuario {
  name: string;
  email: string;
  address: { city: string };
}

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [UsuarioTarjetaComponent],
  template: `
    <div class="controles">
      <button (click)="cargar(URL_API)">Recargar</button>
      <button class="secundario" (click)="cargar(URL_FALLA)">Probar el error</button>
    </div>

    @if (cargando()) {
      <p class="estado">Cargando usuarios...</p>
    }

    @if (error()) {
      <p class="estado error">{{ error() }}</p>
    }

    @if (!cargando() && !error() && usuarios().length === 0) {
      <p class="estado">No hay usuarios para mostrar.</p>
    }

    @if (!cargando() && !error() && usuarios().length > 0) {
      <p class="estado ok">Se cargaron {{ usuarios().length }} usuarios.</p>
    }

    <div class="lista">
      @for (u of usuarios(); track u.email) {
        <app-usuario-tarjeta
          [nombre]="u.name"
          [correo]="u.email"
          [ciudad]="u.address.city" />
      }
    </div>
  `,
  styles: [`
    .controles {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }

    .estado {
      font-size: 14px;
      color: #9aa0aa;
      margin: 0 0 16px 0;
    }

    .estado.error { color: #d98b8b; }
    .estado.ok { color: #8fb87a; }
  `]
})
export class UsuariosListaComponent implements OnInit {

  URL_API = 'https://jsonplaceholder.typicode.com/users';

  // Direccion inventada, sirve para ver el estado de error
  URL_FALLA = 'https://esta-direccion-no-existe.corhuila/usuarios';

  // El estado del componente. Se usan signals porque Angular
  // trabaja en modo zoneless: al cambiar el signal, la vista
  // se entera sola y se vuelve a dibujar.
  usuarios = signal<Usuario[]>([]);
  cargando = signal(false);
  error = signal('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargar(this.URL_API);
  }

  cargar(url: string): void {
    this.cargando.set(true);
    this.error.set('');
    this.usuarios.set([]);

    this.http.get<Usuario[]>(url).subscribe({
      next: (datos) => {
        // Medio segundo de espera a proposito, para que se alcance
        // a ver el estado de carga. En produccion no iria.
        setTimeout(() => {
          this.usuarios.set(datos);
          this.cargando.set(false);
        }, 500);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('No se pudieron cargar los usuarios. Intenta de nuevo.');
      }
    });
  }
}
