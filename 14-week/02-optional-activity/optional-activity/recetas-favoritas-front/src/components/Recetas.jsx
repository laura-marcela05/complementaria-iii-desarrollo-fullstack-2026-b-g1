import { useEffect, useState } from "react";
import { getRecetas, crearReceta } from "../api";

const VACIA = { mealId: "", nombre: "", categoria: "", area: "", imagenUrl: "" };

export default function Recetas({ onCerrarSesion }) {
  const [recetas, setRecetas] = useState([]);
  const [estado, setEstado] = useState("cargando"); // "cargando" | "ok" | "error"
  const [error, setError] = useState(null);

  const [form, setForm] = useState(VACIA);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);

  // Al aparecer la pantalla se piden las recetas a la API (con el token)
  useEffect(() => {
    getRecetas()
      .then((datos) => {
        setRecetas(datos);
        setEstado("ok");
      })
      .catch((err) => {
        setError(err.message);
        setEstado("error");
      });
  }, []);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar(e) {
    e.preventDefault();
    setGuardando(true);
    setErrorForm(null);
    try {
      const nueva = await crearReceta(form);
      setRecetas([...recetas, nueva]);
      setForm(VACIA);
    } catch (err) {
      setErrorForm(err.message);
    }
    setGuardando(false);
  }

  return (
    <div>
      <header className="barra">
        <h1>Recetas Favoritas</h1>
        <button className="secundario" onClick={onCerrarSesion}>Cerrar sesión</button>
      </header>

      {estado === "cargando" && <p className="cargando">Cargando recetas...</p>}
      {estado === "error" && <p className="error">{error}</p>}

      {estado === "ok" && (
        <>
          <form className="tarjeta nueva" onSubmit={guardar}>
            <h2>Guardar una receta</h2>
            <div className="campos">
              <input name="mealId" placeholder="ID en TheMealDB" value={form.mealId} onChange={cambiar} required />
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} required />
              <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={cambiar} required />
              <input name="area" placeholder="Área (país)" value={form.area} onChange={cambiar} required />
              <input name="imagenUrl" placeholder="URL de la imagen" value={form.imagenUrl} onChange={cambiar} />
            </div>
            <button type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </button>
            {errorForm && <p className="error">{errorForm}</p>}
          </form>

          {recetas.length === 0 && <p className="vacio">Aún no tienes recetas favoritas.</p>}

          <div className="rejilla">
            {recetas.map((r) => (
              <article className="tarjeta receta" key={r.id}>
                {r.imagenUrl && <img src={r.imagenUrl} alt={r.nombre} />}
                <h3>{r.nombre}</h3>
                <p>{r.categoria} · {r.area}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}