// Componente principal: guarda el estado y consume la API
function App() {
  const [usuarios, setUsuarios] = React.useState([]);
  const [estado, setEstado] = React.useState("cargando"); // cargando | listo | error

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de usuarios");
        }
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
        setEstado("listo");
      })
      .catch(() => {
        setEstado("error");
      });
  }, []);

  return (
    <React.Fragment>
      {estado === "cargando" && <p>Cargando usuarios...</p>}
      {estado === "error" && <p>Ocurrió un error al cargar los usuarios.</p>}
      <ul>
        {usuarios.map((usuario) => (
          <UserCard key={usuario.id} usuario={usuario} />
        ))}
      </ul>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
