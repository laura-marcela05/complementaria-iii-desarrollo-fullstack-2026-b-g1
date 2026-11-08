import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function enviar(e) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      const token = await login(username, password);
      onLogin(token);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  }

  return (
    <form className="tarjeta login" onSubmit={enviar}>
      <h1>Recetas Favoritas</h1>
      <p className="sub">Inicia sesión para ver tus recetas</p>

      <label>
        Usuario
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>

      <label>
        Contraseña
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>

      <button type="submit" disabled={cargando}>
        {cargando ? "Ingresando..." : "Ingresar"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}