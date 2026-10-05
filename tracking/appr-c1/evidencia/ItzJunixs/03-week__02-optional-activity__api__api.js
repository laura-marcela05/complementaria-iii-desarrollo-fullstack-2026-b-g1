// Función encargada de obtener las publicaciones desde la API
export async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");

  // Si la respuesta no fue exitosa, lanzamos un error
  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de publicaciones");
  }

  const data = await response.json();
  return data;
}
