// ============================================================
// app.js — componente React (JSX) del mini-frontend
// Consume la API local (json-server) y maneja 3 estados:
// cargando / datos / error.
// ============================================================

const { useState } = React;

const API_URL = "http://localhost:3000/jugadores";

function App() {
  // estado: "inicial" | "cargando" | "datos" | "error"
  const [estado, setEstado] = useState("inicial");
  const [jugadores, setJugadores] = useState([]);

  function cargarJugadores() {
    setEstado("cargando");

    fetch(API_URL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Respuesta no válida de la API");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setJugadores(datos);
        setEstado("datos");
      })
      .catch(() => {
        setEstado("error");
      });
  }

  return (
    <section>
      <h1 className="h3 mb-1">Convocados al Mundial 2026</h1>
      <p className="text-muted mb-4">Presiona el botón para ver la lista de jugadores.</p>

      {estado === "inicial" && (
        <div className="text-center py-5">
          <button className="btn btn-lg btn-primary" onClick={cargarJugadores}>
            Mostrar jugadores
          </button>
        </div>
      )}

      {estado === "cargando" && (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 200 }}>
          <div className="spinner-border text-primary me-2" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <span>Cargando jugadores...</span>
        </div>
      )}

      {estado === "error" && (
        <div className="alert alert-danger" role="alert">
          No se pudo conectar con la API. Verifica que <code>json-server</code> esté corriendo
          en <code>http://localhost:3000</code> y vuelve a intentar.
          <button className="btn btn-sm btn-outline-danger ms-2" onClick={cargarJugadores}>
            Reintentar
          </button>
        </div>
      )}

      {estado === "datos" && (
        <div className="row g-3">
          {jugadores.map((jugador) => (
            <div className="col-12 col-sm-6 col-lg-4" key={jugador.id}>
              <div className="card jugador-card p-3 d-flex flex-row align-items-center gap-3">
                <img src="assets/img/camiseta.svg" alt="Jugador" />
                <div>
                  <h2 className="h6 mb-1">{jugador.nombre}</h2>
                  <span className="badge badge-posicion text-white">
                    #{jugador.dorsal} · {jugador.posicion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);