import { Component, Input } from '@angular/core';

// Este es el componente reutilizable. No sabe nada de APIs:
// solo recibe tres datos y los muestra. Por eso se puede usar
// en cualquier pantalla donde haya que mostrar un usuario.
@Component({
  selector: 'app-usuario-tarjeta',
  standalone: true,
  template: `
    <div class="datos">
      <span class="nombre">{{ nombre }}</span>
      <span class="correo">{{ correo }}</span>
    </div>
    <span class="ciudad">{{ ciudad }}</span>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      background-color: #262a31;
      border-left: 3px solid #d99a3c;
      padding: 12px 14px;
      margin-bottom: 8px;
    }

    .datos {
      display: flex;
      flex-direction: column;
    }

    .nombre {
      font-weight: bold;
    }

    .correo, .ciudad {
      color: #9aa0aa;
      font-size: 13px;
    }

    .ciudad {
      text-align: right;
    }
  `]
})
export class UsuarioTarjetaComponent {
  @Input() nombre = '';
  @Input() correo = '';
  @Input() ciudad = '';
}
