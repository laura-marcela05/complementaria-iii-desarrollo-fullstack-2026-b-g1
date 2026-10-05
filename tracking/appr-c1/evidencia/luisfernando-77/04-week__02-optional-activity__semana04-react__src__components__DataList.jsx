import { useEffect, useState } from "react";
import "./DataList.css";

/**
 * DataList
 * Componente REUTILIZABLE que consume cualquier API REST,
 * maneja su propio estado (loading / error / data) y
 * renderiza una lista usando la función renderItem que le pases.
 *
 * Props:
 * - apiUrl: string -> endpoint a consumir (requerido)
 * - renderItem: (item, index) => JSX -> cómo pintar cada elemento (requerido)
 * - title: string -> título opcional que se muestra arriba
 * - emptyMessage: string -> mensaje cuando la API responde vacío
 */
function DataList({ apiUrl, renderItem, title, emptyMessage = "No hay datos para mostrar." }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // evita actualizar estado si el componente ya se desmontó

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: no se pudo obtener la información`);
        }
        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return (
    <section className="data-list">
      {title && <h2 className="data-list__title">{title}</h2>}

      {loading && (
        <div className="data-list__state data-list__state--loading">
          <span className="spinner" />
          <p>Cargando datos...</p>
        </div>
      )}

      {!loading && error && (
        <div className="data-list__state data-list__state--error">
          <p>⚠️ Ocurrió un error: {error}</p>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="data-list__state">
          <p>{emptyMessage}</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <ul className="data-list__items">
          {data.map((item, index) => (
            <li key={item.id ?? index} className="data-list__item">
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DataList;
