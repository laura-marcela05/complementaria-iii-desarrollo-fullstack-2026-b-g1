import { useState, useEffect } from "react";

function DataList({ url, renderItem }) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      setCargando(true);
      setError(null);
      try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const json = await respuesta.json();
        if (activo) setDatos(json);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [url]);

  if (cargando) {
    return <p className="data-list__estado">Cargando datos...</p>;
  }

  if (error) {
    return <p className="data-list__estado data-list__estado--error">Ocurrió un error: {error}</p>;
  }

  if (datos.length === 0) {
    return <p className="data-list__estado">No hay datos para mostrar.</p>;
  }

  return (
    <ul className="data-list">
      {datos.map((item) => (
        <li className="data-list__item" key={item.id}>
          {renderItem ? renderItem(item) : JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
}

export default DataList;