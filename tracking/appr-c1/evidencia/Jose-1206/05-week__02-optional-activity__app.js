const { useState, useEffect } = React;

const API_URL = 'https://fakestoreapi.com/products?limit=8';

function ProductGrid({ products }) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <span className="product-title">{product.title}</span>
          <span className="product-price">${product.price}</span>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const loadProducts = () => {
    setStatus('loading');

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setStatus('success');
      })
      .catch((err) => {
        setErrorMsg(err.message || 'Ocurrió un error inesperado.');
        setStatus('error');
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="app">
      <p className="eyebrow">Actividad 5 · Mini-frontend integrado</p>
      <h1>Catálogo de productos</h1>
      <p className="lead">
        Vista construida en React que consume una API pública (FakeStoreAPI) y
        controla los tres estados de la petición: cargando, con datos y error.
      </p>

      <div className="toolbar">
        <button className="refresh-btn" onClick={loadProducts} disabled={status === 'loading'}>
          {status === 'loading' ? 'Cargando…' : 'Actualizar catálogo'}
        </button>
        <span className="status-tag">Estado actual: {status}</span>
      </div>

      {status === 'loading' && (
        <div className="state-box">
          <div className="spinner" aria-hidden="true"></div>
          <p>Cargando productos…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="state-box error">
          <p className="error-title">No se pudieron cargar los productos</p>
          <p>{errorMsg}</p>
        </div>
      )}

      {status === 'success' && <ProductGrid products={products} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
