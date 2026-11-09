const API_URL = "http://localhost:8080/api";

// fetch solo falla por su cuenta cuando no llega ninguna respuesta:
// la API está apagada o el navegador la bloqueó por CORS.
async function pedir(url, opciones) {
  try {
    return await fetch(url, opciones);
  } catch {
    throw new Error(
      "No se pudo conectar con la API. Revisa que esté encendida y que CORS permita este origen.",
    );
  }
}

// POST /api/auth/login: si las credenciales son correctas, guarda el token en localStorage
export async function login(username, password) {
  const res = await pedir(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.status === 401) throw new Error("Usuario o contraseña incorrectos.");
  if (!res.ok) throw new Error("Error " + res.status);

  const datos = await res.json();
  localStorage.setItem("token", datos.token);
  return datos.token;
}

// Petición a un endpoint protegido: lee el token guardado y lo envía en la cabecera Authorization
async function conToken(ruta, opciones = {}) {
  const token = localStorage.getItem("token");
  const res = await pedir(`${API_URL}${ruta}`, {
    ...opciones,
    headers: { ...opciones.headers, Authorization: `Bearer ${token}` },
  });
  if (res.status === 401)
    throw new Error(
      "Tu sesión no es válida o ya venció (401). Inicia sesión de nuevo.",
    );
  if (res.status === 403)
    throw new Error("No tienes permiso para hacer esto (403).");
  if (!res.ok) throw new Error("Error " + res.status);
  return res;
}

// GET /api/recetas-favoritas
export async function getRecetas() {
  const res = await conToken("/recetas-favoritas");
  return res.json();
}

// POST /api/recetas-favoritas
export async function crearReceta(receta) {
  const res = await conToken("/recetas-favoritas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(receta),
  });
  return res.json();
}
