// Función encargada de obtener los usuarios desde la API
export async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  // Si la respuesta no fue exitosa, lanzamos un error
  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de usuarios");
  }

  const data = await response.json();
  return data;
}
