import { useState } from "react";
import Login from "./components/Login";
import Recetas from "./components/Recetas";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function cerrarSesion() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <main>
      {token ? <Recetas onCerrarSesion={cerrarSesion} /> : <Login onLogin={setToken} />}
    </main>
  );
}