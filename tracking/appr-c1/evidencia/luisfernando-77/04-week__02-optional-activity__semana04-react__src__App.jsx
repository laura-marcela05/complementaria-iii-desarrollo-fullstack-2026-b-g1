import DataList from "./components/DataList";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
        Semana 4 · Componente que consume datos
      </h1>

      {/* Ejemplo 1: lista de usuarios */}
      <DataList
        apiUrl="https://jsonplaceholder.typicode.com/users"
        title="Usuarios (API)"
        renderItem={(user) => (
          <div>
            <strong>{user.name}</strong>
            <p style={{ margin: 0, color: "#6b7280" }}>{user.email}</p>
          </div>
        )}
      />

      {/* Ejemplo 2: el MISMO componente reutilizado con otra API y otro render */}
      <DataList
        apiUrl="https://jsonplaceholder.typicode.com/posts?_limit=5"
        title="Posts (API)"
        renderItem={(post) => <p style={{ margin: 0 }}>{post.title}</p>}
      />
    </div>
  );
}

export default App;
