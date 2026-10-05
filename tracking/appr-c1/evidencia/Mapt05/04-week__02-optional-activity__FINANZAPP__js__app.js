// ---------- Estado de la app en memoria ----------
let categorias = [];
let ingresos = [];
let gastos = [];

// ---------- Referencias a elementos del DOM ----------
const elCarga = document.getElementById('estado-carga');
const elError = document.getElementById('estado-error');
const elContenido = document.getElementById('contenido');

const elTotalIngresos = document.getElementById('total-ingresos');
const elTotalGastos = document.getElementById('total-gastos');
const elTotalBalance = document.getElementById('total-balance');

const formIngreso = document.getElementById('form-ingreso');
const formGasto = document.getElementById('form-gasto');
const selectCategoria = document.getElementById('gasto-categoria');

const elBarrasLimites = document.getElementById('barras-limites');
const elConsejos = document.getElementById('consejos');
const elMovimientos = document.getElementById('lista-movimientos');

// Limites recomendados segun la regla financiera 50/30/20
const LIMITES = {
  necesidad: { nombre: 'Necesidades (arriendo, comida, servicios, transporte)', porcentaje: 50 },
  gusto: { nombre: 'Gustos (ocio, compras)', porcentaje: 30 },
  ahorro: { nombre: 'Ahorro', porcentaje: 20 }
};

// ---------- Consumir la "API" con fetch ----------
function cargarDatos() {
  // Estado: cargando (ya se ve por defecto en el HTML)
  fetch('data/datos.json')
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return respuesta.json();
    })
    .then((datos) => {
      // Estado: datos cargados correctamente
      categorias = datos.categorias;
      ingresos = datos.ingresos;
      gastos = datos.gastos;

      cargarDeLocalStorage();   

      llenarSelectCategorias();
        
      const totalIngresos = renderizarResumen();
      renderizarBarrasLimites(totalIngresos);
      renderizarConsejos(totalIngresos);
      renderizarMovimientos();


      elCarga.classList.add('oculto');
      elContenido.classList.remove('oculto');
    })
    .catch((error) => {
      // Estado: error
      console.error('Error cargando datos:', error);
      elCarga.classList.add('oculto');
      elError.classList.remove('oculto');
    });
}

cargarDatos();

// ---------- Llenar el <select> de categorias ----------
function llenarSelectCategorias() {
  selectCategoria.innerHTML = '';
  categorias.forEach((cat) => {
    const opcion = document.createElement('option');
    opcion.value = cat.id;
        opcion.textContent = `${cat.emoji} ${cat.nombre}`;
    selectCategoria.appendChild(opcion);
  });
}

// ---------- Formatear numeros como pesos colombianos ----------
function formatearMoneda(numero) {
  return numero.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}
// ---------- Guardar y cargar datos del usuario en localStorage ----------
function guardarEnLocalStorage() {
  localStorage.setItem('finanzas-ingresos', JSON.stringify(ingresos));
  localStorage.setItem('finanzas-gastos', JSON.stringify(gastos));
}

function cargarDeLocalStorage() {
  const ingresosGuardados = localStorage.getItem('finanzas-ingresos');
  const gastosGuardados = localStorage.getItem('finanzas-gastos');

  if (ingresosGuardados) {
    ingresos = JSON.parse(ingresosGuardados);
  }
  if (gastosGuardados) {
    gastos = JSON.parse(gastosGuardados);
  }
}

// ---------- Calcular totales y renderizar el resumen ----------
function renderizarResumen() {
  const totalIngresos = ingresos.reduce((suma, i) => suma + i.monto, 0);
  const totalGastos = gastos.reduce((suma, g) => suma + g.monto, 0);
  const balance = totalIngresos - totalGastos;

  elTotalIngresos.textContent = formatearMoneda(totalIngresos);
  elTotalGastos.textContent = formatearMoneda(totalGastos);
  elTotalBalance.textContent = formatearMoneda(balance);

  return totalIngresos;
}

// ---------- Calcular gasto por grupo y renderizar barras ----------
function renderizarBarrasLimites(totalIngresos) {
  elBarrasLimites.innerHTML = '';

  Object.keys(LIMITES).forEach((grupo) => {
    const idsCategoriaDelGrupo = categorias.filter((c) => c.grupo === grupo).map((c) => c.id);
    const totalGrupo = gastos
      .filter((g) => idsCategoriaDelGrupo.includes(g.categoria))
      .reduce((suma, g) => suma + g.monto, 0);

    const porcentajeReal = totalIngresos > 0 ? (totalGrupo / totalIngresos) * 100 : 0;
    const limite = LIMITES[grupo].porcentaje;
    const excedido = porcentajeReal > limite;

    const anchoBarra = Math.min(porcentajeReal, limite * 1.5);

    const div = document.createElement('div');
    div.className = 'barra-grupo';
    div.innerHTML = `
      <div class="barra-info">
        <span>${LIMITES[grupo].nombre}</span>
        <span>${porcentajeReal.toFixed(0)}% de ${limite}%</span>
      </div>
      <div class="barra-fondo">
        <div class="barra-relleno ${excedido ? 'excedido' : ''}" style="width: ${Math.min(anchoBarra / (limite * 1.5) * 100, 100)}%"></div>
      </div>
    `;
    elBarrasLimites.appendChild(div);
  });
}

// ---------- Generar consejos financieros ----------
function renderizarConsejos(totalIngresos) {
  elConsejos.innerHTML = '<h2>Consejos</h2>';

  if (totalIngresos === 0) {
    elConsejos.innerHTML += '<p class="consejo">Agrega un ingreso para ver recomendaciones personalizadas.</p>';
    return;
  }

  Object.keys(LIMITES).forEach((grupo) => {
    const idsCategoriaDelGrupo = categorias.filter((c) => c.grupo === grupo).map((c) => c.id);
    const totalGrupo = gastos
      .filter((g) => idsCategoriaDelGrupo.includes(g.categoria))
      .reduce((suma, g) => suma + g.monto, 0);

    const porcentajeReal = (totalGrupo / totalIngresos) * 100;
    const limite = LIMITES[grupo].porcentaje;

    const p = document.createElement('p');
    if (porcentajeReal > limite) {
      p.className = 'consejo';
      p.textContent = `Estas gastando ${porcentajeReal.toFixed(0)}% en ${LIMITES[grupo].nombre.split(' (')[0]}, por encima del ${limite}% recomendado. Intenta reducirlo.`;
    } else {
      p.className = 'consejo ok';
      p.textContent = `Vas bien en ${LIMITES[grupo].nombre.split(' (')[0]}: ${porcentajeReal.toFixed(0)}% de ${limite}% recomendado.`;
    }
    elConsejos.appendChild(p);
  });
}

// ---------- Renderizar la lista de movimientos recientes ----------
function renderizarMovimientos() {
  elMovimientos.innerHTML = '';

  const movimientos = [
    ...ingresos.map((i) => ({ ...i, tipo: 'ingreso', texto: i.fuente, emoji: '💵' })),
    ...gastos.map((g) => {
      const cat = categorias.find((c) => c.id === g.categoria);
      return { ...g, tipo: 'gasto', texto: g.descripcion, emoji: cat ? cat.emoji : '💸' };
    })
  ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  movimientos.forEach((mov) => {
    const li = document.createElement('li');
    const signo = mov.tipo === 'ingreso' ? '+' : '-';
    const clase = mov.tipo === 'ingreso' ? 'monto-ingreso' : 'monto-gasto';
    li.innerHTML = `
      <span class="mov-texto">${mov.emoji} ${mov.texto}</span>
      <span class="mov-derecha">
        <span class="${clase}">${signo}${formatearMoneda(mov.monto)}</span>
        <button class="btn-borrar" data-tipo="${mov.tipo}" data-id="${mov.id}" aria-label="Eliminar movimiento">✕</button>
      </span>
    `;
    elMovimientos.appendChild(li);
  });
}

// ---------- Eliminar un movimiento (delegacion de eventos) ----------
elMovimientos.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-borrar');
  if (!boton) return;

  const tipo = boton.dataset.tipo;
  const id = Number(boton.dataset.id);

  if (tipo === 'ingreso') {
    ingresos = ingresos.filter((i) => i.id !== id);
  } else {
    gastos = gastos.filter((g) => g.id !== id);
  }

  guardarEnLocalStorage();
  renderizarTodo();
});

// ---------- Funcion que junta todos los renders ----------
function renderizarTodo() {
  const totalIngresos = renderizarResumen();
  renderizarBarrasLimites(totalIngresos);
  renderizarConsejos(totalIngresos);
  renderizarMovimientos();
}

// ---------- Manejar el formulario de ingresos ----------
formIngreso.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const fuente = document.getElementById('ingreso-fuente').value.trim();
  const monto = Number(document.getElementById('ingreso-monto').value);

  if (!fuente || monto <= 0) return;

  ingresos.push({
    id: Date.now(),
    fuente,
    monto,
    fecha: new Date().toISOString().split('T')[0]
  });

  guardarEnLocalStorage();
  renderizarTodo();
  formIngreso.reset();
});

// ---------- Manejar el formulario de gastos ----------
formGasto.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const descripcion = document.getElementById('gasto-descripcion').value.trim();
  const categoria = selectCategoria.value;
  const monto = Number(document.getElementById('gasto-monto').value);

  if (!descripcion || monto <= 0) return;

  gastos.push({
    id: Date.now(),
    descripcion,
    categoria,
    monto,
    fecha: new Date().toISOString().split('T')[0]
  });

  guardarEnLocalStorage();
  renderizarTodo();
  formGasto.reset();
});

// ---------- Arrancar la app ----------
cargarDatos();