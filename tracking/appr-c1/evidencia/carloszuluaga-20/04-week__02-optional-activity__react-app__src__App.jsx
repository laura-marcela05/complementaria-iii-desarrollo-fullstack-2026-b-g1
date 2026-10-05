import { useEffect, useState } from "react";
import ListaUsuarios from "./components/ListaUsuarios";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setUsuarios(datos);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <h1>Cargando usuarios...</h1>;
  }

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}

export default App;