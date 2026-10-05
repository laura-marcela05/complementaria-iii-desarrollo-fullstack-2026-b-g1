// Componente reutilizable: recibe un usuario y muestra su tarjeta
function UserCard({ usuario }) {
  return (
    <li>{usuario.name} - {usuario.email}</li>
  );
}
