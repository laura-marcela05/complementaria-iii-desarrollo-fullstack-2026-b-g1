const { useState, useEffect } = React;

/* ============================================
   COMPONENTE: ProductCard
   Muestra un solo producto. Reutilizable.
============================================ */
function ProductCard({ producto, onAgregar, onVerDetalle }) {
  const [agregado, setAgregado] = useState(false);

  function handleAgregarRapido(e) {
    e.stopPropagation();
    onAgregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1400);
  }

  return (
    <div className="product-card">
      <div className="media" onClick={() => onVerDetalle(producto)}>
        <img src={producto.image} alt={producto.title} />
        <span className="tag-precio">${producto.price.toLocaleString('es-CO')}</span>
      </div>

      <h3 onClick={() => onVerDetalle(producto)}>{producto.title}</h3>

      <button
        className={agregado ? 'agregado' : ''}
        onClick={handleAgregarRapido}
      >
        {agregado ? 'Agregado ✓' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      Envío gratis en pedidos desde $150.000
    </div>
  );
}

/* Pantalla de carga: se muestra mientras esperamos la respuesta de la API */
function PantallaCarga() {
  return (
    <div className="estado-app">
      <span className="spinner" aria-hidden="true"></span>
      <p className="estado-app-texto">Cargando catálogo…</p>
    </div>
  );
}

/* Pantalla de error: se muestra si el fetch a la API falla */
function PantallaError({ mensaje, onReintentar }) {
  return (
    <div className="estado-app">
      <p className="section-eyebrow">Ups</p>
      <h2 className="section-title">No pudimos cargar el catálogo</h2>
      <p className="estado-app-texto">{mensaje}</p>
      <button className="hero-cta" onClick={onReintentar}>Reintentar</button>
    </div>
  );
}

/* Icono de bolsa reutilizable, reemplaza el emoji 🛒 en la barra de navegación */
function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7h15l-1.5 9.5a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L4.7 4.3A1 1 0 0 0 3.7 3.5H2" />
      <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Hero({ categorias, cantidadCarrito, onIrACategoria, onVerCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const links = categorias.filter((c) => c !== 'todos');

  return (
    <section className="hero">
      <nav className="hero-nav">
        <button
          className="nav-burger"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>

        <div className={`hero-nav-links ${menuAbierto ? 'abierto' : ''}`}>
          {links.map((categoria) => (
            <button
              key={categoria}
              onClick={() => { setMenuAbierto(false); onIrACategoria(categoria); }}
            >
              {categoria}
            </button>
          ))}
        </div>

        <span className="hero-logo">UrbanStyle</span>

        <div className="nav-actions">
          <button className="nav-icon-btn hero-cart" onClick={onVerCarrito} aria-label="Ver carrito">
            <CartIcon />
            {cantidadCarrito > 0 && <span className="nav-badge">{cantidadCarrito}</span>}
          </button>
        </div>
      </nav>

      <div className="hero-content">
        <p className="hero-eyebrow">Colección 2026</p>
        <h1 className="hero-title">Nueva colección</h1>
        <button className="hero-cta" onClick={() => onIrACategoria('todos')}>
          Ver catálogo ↓
        </button>
      </div>
    </section>
  );
}
function CatalogHeader({ onVolver, cantidadCarrito, onVerCarrito }) {
  return (
    <header className="catalog-header">
      <button className="volver-btn" onClick={onVolver}>
        <span className="volver-arrow">←</span>
        <span className="volver-texto">Volver</span>
      </button>
      <span className="catalog-logo">UrbanStyle</span>
      <div className="nav-actions">
        <button className="nav-icon-btn" onClick={onVerCarrito} aria-label="Ver carrito">
          <CartIcon />
          {cantidadCarrito > 0 && <span className="nav-badge">{cantidadCarrito}</span>}
        </button>
      </div>
    </header>
  );
}

function Header({ cantidadCarrito }) {
  return (
    <header className="site-header">
      <h1>UrbanStyle</h1>
      <div className={`carrito-indicador ${cantidadCarrito > 0 ? 'tiene-items' : ''}`}>
        🛒 Carrito: <strong>{cantidadCarrito}</strong>
      </div>
    </header>
  );
}

/* ============================================
   COMPONENTE: ProductList
   Recibe los productos ya cargados desde la API
   (ver App -> cargarCatalogo) y pinta una tarjeta
   por cada uno.
============================================ */
function ProductList({ productos, onAgregar, onVerDetalle, columnas }) {
  if (productos.length === 0) {
    return (
      <p className="estado">
        No hay productos en esta categoría.
      </p>
    );
  }

  return (
    <div className={`product-grid ${columnas === 'compacta' ? 'grid-compacta' : ''}`}>
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </div>
  );
}

function ProductDetail({ producto, onAgregar }) {
  const [talla, setTalla] = useState(null);
  const [agregado, setAgregado] = useState(false);

  const tallas =
    producto.category === 'zapatos'
      ? ['38', '39', '40', '41', '42', '43']
      : ['S', 'M', 'L', 'XL'];

  function handleAgregar() {
    if (!talla) return;
    onAgregar({ ...producto, talla });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1400);
  }

  return (
    <section className="detalle">
      <div className="detalle-imagen">
        <img src={producto.image} alt={producto.title} />
      </div>

      <div className="detalle-info">
        <p className="detalle-categoria">{producto.category} · {producto.tipo}</p>
        <h1 className="detalle-titulo">{producto.title}</h1>
        <p className="detalle-precio">${producto.price.toLocaleString('es-CO')}</p>

        <span className="detalle-tallas-label">Talla</span>
        <div className="detalle-tallas-grid">
          {tallas.map((t) => (
            <button
              key={t}
              className={`talla-btn ${talla === t ? 'activo' : ''}`}
              onClick={() => setTalla(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          className={`detalle-cta ${!talla ? 'deshabilitado' : ''}`}
          onClick={handleAgregar}
          disabled={!talla}
        >
          {agregado ? 'Agregado ✓' : talla ? 'Agregar al carrito' : 'Selecciona una talla'}
        </button>

        <div className="detalle-beneficios">
          <div className="beneficio">
            <span className="beneficio-titulo">Envíos gratis</span>
            <span className="beneficio-texto">Aplica para compras sin descuento.</span>
          </div>
          <div className="beneficio">
            <span className="beneficio-titulo">Te llega en 6 días</span>
            <span className="beneficio-texto">Solo días hábiles para ciudades principales.</span>
          </div>
          <div className="beneficio">
            <span className="beneficio-titulo">Devoluciones gratis</span>
            <span className="beneficio-texto">Aplica para compras sin descuento.</span>
          </div>
        </div>

        <div className="detalle-descripcion">
          <h3>Sobre el producto</h3>
          <p>
            {producto.title}, categoría {producto.category}, tipo {producto.tipo}.
            Prenda pensada para uso diario, combina fácil con el resto de tu outfit.
          </p>
        </div>
      </div>
    </section>
  );
}

function CartView({ carrito, onCambiarCantidad, onQuitar, onVolver }) {
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <section className="carrito-vacio">
        <p className="section-eyebrow">Tu carrito</p>
        <h2 className="section-title">Está vacío</h2>
        <button className="hero-cta" onClick={onVolver}>Ver catálogo</button>
      </section>
    );
  }

  return (
    <section className="carrito-view">
      <h2 className="section-title">Tu carrito</h2>

      <div className="carrito-lista">
        {carrito.map((item) => (
          <div className="carrito-item" key={`${item.id}-${item.talla}`}>
            <img src={item.image} alt={item.title} />

            <div className="carrito-item-info">
              <h4>{item.title}</h4>
              <p className="carrito-item-talla">Talla: {item.talla}</p>
            </div>

            <div className="carrito-item-cantidad">
              <button onClick={() => onCambiarCantidad(item.id, item.talla, -1)}>−</button>
              <span>{item.cantidad}</span>
              <button onClick={() => onCambiarCantidad(item.id, item.talla, 1)}>+</button>
            </div>

            <p className="carrito-item-subtotal">
              ${(item.price * item.cantidad).toLocaleString('es-CO')}
            </p>

            <button className="carrito-item-quitar" onClick={() => onQuitar(item.id, item.talla)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-resumen">
        <div className="carrito-total">
          <span>Total</span>
          <strong>${total.toLocaleString('es-CO')}</strong>
        </div>
        <button
          className="hero-cta"
          onClick={() => alert('¡Gracias por tu compra! (esto es una demo, no se procesa pago real)')}
        >
          Finalizar compra
        </button>
        <button className="volver-btn-claro" onClick={onVolver}>← Seguir comprando</button>
      </div>
    </section>
  );
}

function CategoryTabs({ categorias, activa, onSeleccionar }) {
  return (
    <div className="tabs-categoria">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={`tab-btn ${activa === categoria ? 'activo' : ''}`}
          onClick={() => onSeleccionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

function CategoryIntro({ categoria, productos, tipoActivo, onFiltrarTipo, vistaGrid, onCambiarVista, ordenAsc, onOrdenar }) {
  const titulo = categoria === 'todos' ? 'Todo el catálogo' : categoria;

  // Un producto representativo por cada tipo, en orden de aparición
  const tipos = [];
  const imagenPorTipo = {};
  productos.forEach((p) => {
    const t = p.tipo || 'otros';
    if (!imagenPorTipo[t]) {
      imagenPorTipo[t] = p.image;
      tipos.push(t);
    }
  });

  return (
    <div className="category-intro">
      {categoria !== 'todos' && <p className="section-eyebrow">Ropa para</p>}
      <h2 className="section-title">{titulo}</h2>

      {categoria !== 'todos' && tipos.length > 1 && (
        <div className="collection-strip">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              className={`collection-tile ${tipoActivo === tipo ? 'activo' : ''}`}
              onClick={() => onFiltrarTipo(tipoActivo === tipo ? null : tipo)}
            >
              <span
                className="collection-tile-media"
                style={{ backgroundImage: `url(${imagenPorTipo[tipo]})` }}
              />
              <span className="collection-tile-label">{tipo}</span>
            </button>
          ))}
        </div>
      )}

      {tipoActivo && (
        <button className="limpiar-filtro" onClick={() => onFiltrarTipo(null)}>
          ✕ Quitar filtro "{tipoActivo}"
        </button>
      )}

      <div className="toolbar">
        <div className="ver-toggle">
          <span>Ver</span>
          <button
            className={vistaGrid === 'amplia' ? 'activo' : ''}
            onClick={() => onCambiarVista('amplia')}
          >
            ▪ ▪
          </button>
          <button
            className={vistaGrid === 'compacta' ? 'activo' : ''}
            onClick={() => onCambiarVista('compacta')}
          >
            ▪ ▪ ▪ ▪
          </button>
        </div>

        <button className="ordenar-btn" onClick={onOrdenar}>
          Precio {ordenAsc ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2026 UrbanStyle E-Commerce - Actividad Semana 04</p>
    </footer>
  );
}


/* ============================================
   COMPONENTE: CategoryShowcase
============================================ */
function CategoryShowcase({ categorias, productos, onSeleccionar }) {
  const categoriasVisibles = categorias.filter(
    (categoria) => categoria !== 'todos'
  );

  const imagenPorCategoria = {};

  productos.forEach((producto) => {
    if (!imagenPorCategoria[producto.category]) {
      imagenPorCategoria[producto.category] = producto.image;
    }
  });

  return (
      <section className="showcase-home">
      <div className="showcase-home-inner">
      <p className="section-eyebrow">Explora</p>
      <h2 className="section-title">Categorías</h2>

      <div className="collection-strip">
        {categoriasVisibles.map((categoria) => (
          <button
            key={categoria}
            className="collection-tile"
            onClick={() => onSeleccionar(categoria)}
          >
            <span
              className="collection-tile-media"
              style={{ backgroundImage: `url(${imagenPorCategoria[categoria]})` }}
            />
            <span className="collection-tile-label">
              {categoria}
            </span>
          </button>
        ))}
      </div>
      </div>
    </section>
  );
}


/* ============================================
   COMPONENTE PRINCIPAL: App
============================================ */
function App() {
  const [carrito, setCarrito] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [vista, setVista] = useState('inicio'); // 'inicio' | 'catalogo' | 'detalle'
  const [vistaGrid, setVistaGrid] = useState('amplia');
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [tipoActivo, setTipoActivo] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // ---- Catálogo consumido desde una API pública (DummyJSON) ----
  const [catalogo, setCatalogo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Traduce las categorías reales de la API a nuestras 4 secciones de tienda
  const MAPA_CATEGORIAS = {
    'mens-shirts': 'camisetas',
    'tops': 'camisetas',
    'mens-shoes': 'zapatos',
    'womens-shoes': 'zapatos',
    'womens-dresses': 'vestidos',
    'sunglasses': 'accesorios',
    'womens-bags': 'accesorios',
    'womens-jewellery': 'accesorios',
    'mens-watches': 'accesorios',
    'womens-watches': 'accesorios',
  };

  function cargarCatalogo() {
    setCargando(true);
    setError(null);

    fetch('https://dummyjson.com/products?limit=0')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('El servidor respondió con un error (' + respuesta.status + ')');
        }
        return respuesta.json();
      })
      .then((datos) => {
        const productosMapeados = datos.products
          .filter((p) => MAPA_CATEGORIAS[p.category])
          .map((p) => ({
            id: p.id,
            title: p.title,
            // La API da precios en USD; convertimos a COP aprox. para mantener el formato del sitio
            price: Math.round(p.price * 4000),
            image: p.thumbnail,
            category: MAPA_CATEGORIAS[p.category],
            tipo: p.brand || undefined,
          }));
        setCatalogo(productosMapeados);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message || 'No pudimos cargar el catálogo. Intenta de nuevo.');
        setCargando(false);
      });
  }

  useEffect(() => {
    cargarCatalogo();
  }, []);

  const categorias = ['todos', ...new Set(catalogo.map((p) => p.category))];

  const productosFiltrados = catalogo.filter((p) => {
    const coincideCategoria = categoriaActiva === 'todos' || p.category === categoriaActiva;
    const coincideTipo = !tipoActivo || p.tipo === tipoActivo;
    return coincideCategoria && coincideTipo;
  });

  const productosOrdenados = [...productosFiltrados].sort((a, b) =>
    ordenAsc ? a.price - b.price : b.price - a.price
  );

    function agregarAlCarrito(producto) {
    const talla = producto.talla || 'Única';
    setCarrito((prev) => {
      const index = prev.findIndex((item) => item.id === producto.id && item.talla === talla);
      if (index !== -1) {
        const copia = [...prev];
        copia[index] = { ...copia[index], cantidad: copia[index].cantidad + 1 };
        return copia;
      }
      return [...prev, { ...producto, talla, cantidad: 1 }];
    });
  }

  function cambiarCantidadCarrito(id, talla, delta) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + delta }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function quitarDelCarrito(id, talla) {
    setCarrito((prev) => prev.filter((item) => !(item.id === id && item.talla === talla)));
  }

  function irAlCarrito() {
    setVista('carrito');
    window.scrollTo(0, 0);
  }

  function irACatalogo(categoria) {
    setCategoriaActiva(categoria);
    setTipoActivo(null);
    setVista('catalogo');
    window.scrollTo(0, 0);
  }

  function cambiarCategoria(categoria) {
    setCategoriaActiva(categoria);
    setTipoActivo(null);
  }

  function volverAlInicio() {
    setVista('inicio');
    window.scrollTo(0, 0);
  }

  function verDetalle(producto) {
    setProductoSeleccionado(producto);
    setVista('detalle');
    window.scrollTo(0, 0);
  }

  function volverAlCatalogo() {
    setVista('catalogo');
    window.scrollTo(0, 0);
  }

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (cargando) {
    return <PantallaCarga />;
  }

  if (error) {
    return <PantallaError mensaje={error} onReintentar={cargarCatalogo} />;
  }

  return (
    <>
      <AnnouncementBar />

           {vista === 'inicio' && (
        <>
          <Hero
            categorias={categorias}
            cantidadCarrito={totalUnidades}
            onIrACategoria={irACatalogo}
            onVerCarrito={irAlCarrito}
          />
          <CategoryShowcase categorias={categorias} productos={catalogo} onSeleccionar={irACatalogo} />
        </>
      )}
      {vista === 'catalogo' && (
  <>
    <CatalogHeader
      onVolver={volverAlInicio}
      cantidadCarrito={totalUnidades}
      onVerCarrito={irAlCarrito}
    />

    <main id="catalogo">
      <CategoryTabs
        categorias={categorias}
        activa={categoriaActiva}
        onSeleccionar={cambiarCategoria}
      />
            <CategoryIntro
              categoria={categoriaActiva}
              productos={productosFiltrados}
              tipoActivo={tipoActivo}
              onFiltrarTipo={setTipoActivo}
              vistaGrid={vistaGrid}
              onCambiarVista={setVistaGrid}
              ordenAsc={ordenAsc}
              onOrdenar={() => setOrdenAsc((v) => !v)}
            />
            <ProductList
              productos={productosOrdenados}
              onAgregar={agregarAlCarrito}
              onVerDetalle={verDetalle}
              columnas={vistaGrid}
            />
          </main>
        </>
      )}

      {vista === 'detalle' && productoSeleccionado && (
        <>
           <CatalogHeader onVolver={volverAlCatalogo} cantidadCarrito={totalUnidades} onVerCarrito={irAlCarrito} />
          <ProductDetail producto={productoSeleccionado} onAgregar={agregarAlCarrito} />
        </>
      )}
            {vista === 'carrito' && (
        <>
          <CatalogHeader onVolver={volverAlCatalogo} cantidadCarrito={totalUnidades} onVerCarrito={irAlCarrito} />
          <CartView
            carrito={carrito}
            onCambiarCantidad={cambiarCantidadCarrito}
            onQuitar={quitarDelCarrito}
            onVolver={volverAlCatalogo}
          />
        </>
      )}

      <Footer />
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);