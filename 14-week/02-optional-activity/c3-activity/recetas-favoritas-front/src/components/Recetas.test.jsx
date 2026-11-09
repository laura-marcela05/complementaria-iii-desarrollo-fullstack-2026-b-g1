import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import Recetas from "./Recetas";
import { getRecetas } from "../api";

// Se reemplaza api.js por una versión falsa: la prueba no necesita la API encendida
// y en cada caso decido qué "responde" la API.
vi.mock("../api");

beforeEach(() => {
  vi.clearAllMocks();
});

test("muestra las tarjetas con las recetas que devuelve la API", async () => {
  getRecetas.mockResolvedValue([
    { id: 1, mealId: "52771", nombre: "Spicy Arrabiata Penne", categoria: "Vegetarian", area: "Italian", imagenUrl: "" },
    { id: 2, mealId: "52795", nombre: "Chicken Handi", categoria: "Chicken", area: "Indian", imagenUrl: "" },
  ]);

  render(<Recetas onCerrarSesion={() => {}} />);

  // Mientras llega la respuesta se ve el mensaje de carga
  expect(screen.getByText("Cargando recetas...")).toBeInTheDocument();
  // findByText espera a que el texto aparezca, porque los datos llegan después de dibujar el componente
  expect(await screen.findByText("Spicy Arrabiata Penne")).toBeInTheDocument();
  expect(screen.getByText("Chicken Handi")).toBeInTheDocument();
  expect(screen.queryByText("Cargando recetas...")).not.toBeInTheDocument();
});

test("muestra el mensaje de error cuando la API responde 401", async () => {
  getRecetas.mockRejectedValue(
    new Error("Tu sesión no es válida o ya venció (401). Inicia sesión de nuevo."),
  );

  render(<Recetas onCerrarSesion={() => {}} />);

  expect(await screen.findByText(/no es válida o ya venció/)).toBeInTheDocument();
  // En el estado de error no se muestra el formulario ni las tarjetas
  expect(screen.queryByText("Guardar una receta")).not.toBeInTheDocument();
});

test("muestra un aviso cuando la lista de recetas está vacía", async () => {
  getRecetas.mockResolvedValue([]);

  render(<Recetas onCerrarSesion={() => {}} />);

  expect(await screen.findByText("Aún no tienes recetas favoritas.")).toBeInTheDocument();
});
