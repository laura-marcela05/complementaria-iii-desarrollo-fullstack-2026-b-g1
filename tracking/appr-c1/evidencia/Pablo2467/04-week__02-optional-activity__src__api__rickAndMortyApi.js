const BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Obtiene una página de personajes desde la API pública de Rick and Morty.
 * Distingue tres tipos de falla y lanza un mensaje específico para cada una,
 * para que el estado de error muestre algo útil en vez de un mensaje genérico.
 *
 * @param {number} page - número de página a solicitar (la API pagina de a 20 elementos)
 * @returns {Promise<{results: Array, info: Object}>}
 */
export async function getCharacters(page = 1) {
  let response;

  // Caso 1: la petición ni siquiera llega al servidor
  // (sin internet, DNS caído, servidor completamente inalcanzable).
  try {
    response = await fetch(`${BASE_URL}/character?page=${page}`);
  } catch (networkError) {
    if (!navigator.onLine) {
      throw new Error("No hay conexión a internet. Revisa tu red y intenta de nuevo.");
    }
    throw new Error("No se pudo contactar al servidor. Intenta de nuevo en unos segundos.");
  }
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        "Demasiadas peticiones seguidas. Espera unos segundos antes de volver a intentar."
      );
    }
    if (response.status === 404) {
      throw new Error("No se encontraron personajes para esta página.");
    }
    throw new Error(`El servidor respondió con un error (código ${response.status}).`);
  }
  return response.json();
}