const { useState, useEffect } = React;

/**
 * Componente REUTILIZABLE: DataList
 * Recibe por props la URL de la API y cómo renderizar cada item.
 * Maneja su propio estado: cargando, datos, error.
 */
function DataList({ title, apiUrl, renderItem }) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true; // evita actualizar estado si el componente ya se desmontó

    async function cargarDatos() {
      setCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(apiUrl);

        if (!respuesta.ok) {
          throw new Error('Error HTTP: ' + respuesta.status);
        }

        const json = await respuesta.json();

        if (activo) {
          setDatos(json);
          setCargando(false);
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
          setCargando(false);
        }
      }
    }

    cargarDatos();

    return () => { activo = false; };
  }, [apiUrl]);

  return (
    <section className="panel">
      <h2>{title}</h2>

      {cargando && <p className="estado cargando">Cargando datos...</p>}

      {error && !cargando && (
        <p className="estado error">No se pudieron cargar los datos: {error}</p>
      )}

      {!cargando && !error && (
        <ul className="lista">
          {datos.map((item, index) => (
            <li key={index}>{renderItem(item)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * App principal: reutiliza DataList dos veces, con APIs y renderizados distintos.
 * Esto demuestra que el componente es genérico y reutilizable.
 */
function App() {
  return (
    <div className="grid">
      <DataList
        title="Usuarios"
        apiUrl="https://jsonplaceholder.typicode.com/users"
        renderItem={(u) => (
          <>
            <strong>{u.name}</strong>
            <span>{u.email}</span>
          </>
        )}
      />

      <DataList
        title="Publicaciones"
        apiUrl="https://jsonplaceholder.typicode.com/posts?_limit=8"
        renderItem={(p) => (
          <>
            <strong>{p.title}</strong>
          </>
        )}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
