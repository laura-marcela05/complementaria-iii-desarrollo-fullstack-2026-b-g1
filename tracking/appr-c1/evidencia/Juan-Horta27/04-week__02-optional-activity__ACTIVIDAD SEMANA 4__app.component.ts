import { Component } from '@angular/core';
import { UsuariosListaComponent } from './usuarios-lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuariosListaComponent],
  template: `
    <header>
      <h1>Lista de usuarios</h1>
      <p>Datos traidos desde una API publica con Angular.</p>
    </header>

    <main>
      <app-usuarios-lista />
    </main>

    <footer>
      <p>Desarrollo Fullstack &middot; Semana 4 &middot; CORHUILA</p>
    </footer>
  `
})
export class AppComponent {}
