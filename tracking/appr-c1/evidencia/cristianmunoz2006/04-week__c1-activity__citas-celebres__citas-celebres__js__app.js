"use strict";

/**
 * Cuaderno de Citas
 * Frontend que consume la API pública de DummyJSON (/quotes)
 * https://dummyjson.com/docs/quotes
 *
 * Estructura del archivo:
 *  1. Configuración y estado
 *  2. Utilidades de fetch
 *  3. Módulo: Carta del día (hero, quote aleatoria)
 *  4. Módulo: Catálogo (lista completa, búsqueda y paginación)
 *  5. Arranque de la app
 */

/* =========================================================
   1. Configuración y estado
   ========================================================= */
const API_BASE = "https://dummyjson.com";
const PAGE_SIZE = 12;

const state = {
  allQuotes: [], // catálogo completo, cargado una vez
  filtered: [], // resultado tras aplicar la búsqueda
  page: 1,
};

/* =========================================================
   2. Utilidades de fetch
   ========================================================= */

/**
 * Envuelve fetch con manejo de errores de red y de HTTP.
 * @param {string} url
 * @returns {Promise<any>}
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }
  return response.json();
}

/* =========================================================
   2b. Traducción EN → ES (MyMemory Translation API)
   Las citas de DummyJSON vienen en inglés; se traducen al
   vuelo solo lo que se muestra en pantalla (no el catálogo
   entero), y se guarda en caché para no repetir llamadas.
   ========================================================= */
const TRANSLATE_BASE = "https://api.mymemory.translated.net/get";
const translationCache = new Map();

function decodeHTMLEntities(str) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

/**
 * Traduce el texto de una cita al español.
 * Si la traducción falla, se resuelve con el texto original
 * en inglés en lugar de romper el flujo de la app.
 * @param {{id: number, quote: string}} quote
 * @returns {Promise<string>}
 */
async function translateQuote(quote) {
  if (translationCache.has(quote.id)) {
    return translationCache.get(quote.id);
  }
  try {
    const url = `${TRANSLATE_BASE}?q=${encodeURIComponent(quote.quote)}&langpair=en|es`;
    const data = await fetchJSON(url);
    const translated = data?.responseData?.translatedText
      ? decodeHTMLEntities(data.responseData.translatedText)
      : quote.quote;
    translationCache.set(quote.id, translated);
    return translated;
  } catch (err) {
    console.error(`No se pudo traducir la cita #${quote.id}:`, err);
    return quote.quote; // se muestra en inglés como respaldo
  }
}

/* =========================================================
   3. Módulo: Carta del día (hero)
   ========================================================= */
const heroEls = {
  loading: document.getElementById("hero-loading"),
  error: document.getElementById("hero-error"),
  data: document.getElementById("hero-data"),
  text: document.getElementById("hero-text"),
  author: document.getElementById("hero-author"),
  retryBtn: document.getElementById("hero-retry"),
  shuffleBtn: document.getElementById("hero-shuffle"),
};

function setHeroState(name) {
  heroEls.loading.classList.toggle("is-hidden", name !== "loading");
  heroEls.error.classList.toggle("is-hidden", name !== "error");
  heroEls.data.classList.toggle("is-hidden", name !== "data");
}

async function loadHeroQuote() {
  setHeroState("loading");
  try {
    const quote = await fetchJSON(`${API_BASE}/quotes/random`);
    const textEs = await translateQuote(quote);
    heroEls.text.textContent = textEs;
    heroEls.author.textContent = quote.author;
    setHeroState("data");
  } catch (err) {
    console.error("Error al cargar la carta del día:", err);
    setHeroState("error");
  }
}

heroEls.retryBtn.addEventListener("click", loadHeroQuote);
heroEls.shuffleBtn.addEventListener("click", loadHeroQuote);

/* =========================================================
   4. Módulo: Catálogo
   ========================================================= */
const catalogEls = {
  loading: document.getElementById("catalog-loading"),
  loadingText: document.getElementById("catalog-loading-text"),
  error: document.getElementById("catalog-error"),
  empty: document.getElementById("catalog-empty"),
  data: document.getElementById("catalog-data"),
  meta: document.getElementById("catalog-meta"),
  grid: document.getElementById("card-grid"),
  pagerStatus: document.getElementById("pager-status"),
  prevBtn: document.getElementById("prev-page"),
  nextBtn: document.getElementById("next-page"),
  retryBtn: document.getElementById("catalog-retry"),
  searchInput: document.getElementById("search-input"),
};

function setCatalogState(name) {
  const map = {
    loading: catalogEls.loading,
    error: catalogEls.error,
    empty: catalogEls.empty,
    data: catalogEls.data,
  };
  Object.entries(map).forEach(([key, el]) => {
    el.classList.toggle("is-hidden", key !== name);
  });
}

/** Carga todo el catálogo una sola vez (limit=0 = sin límite). */
async function loadCatalog() {
  catalogEls.loadingText.textContent = "Ordenando las fichas del catálogo…";
  setCatalogState("loading");
  try {
    const data = await fetchJSON(`${API_BASE}/quotes?limit=0`);
    state.allQuotes = data.quotes;
    state.filtered = data.quotes;
    state.page = 1;
    catalogEls.meta.textContent = `${data.quotes.length} citas disponibles en el archivo (texto original en inglés, traducidas al mostrarse).`;
    await renderCatalogPage();
  } catch (err) {
    console.error("Error al cargar el catálogo:", err);
    setCatalogState("error");
  }
}

/** Aplica el texto de búsqueda sobre el catálogo cargado en memoria. */
function applySearch(term) {
  const clean = term.trim().toLowerCase();
  state.filtered = !clean
    ? state.allQuotes
    : state.allQuotes.filter(
        (q) =>
          q.quote.toLowerCase().includes(clean) ||
          q.author.toLowerCase().includes(clean)
      );
  state.page = 1;
  renderCatalogPage();
}
// Nota: la búsqueda compara contra el texto original en inglés
// (así evitamos traducir las +1400 citas solo para poder filtrarlas).

/** Dibuja la página actual: tarjetas + paginación, o el estado vacío. */
async function renderCatalogPage() {
  if (state.filtered.length === 0) {
    setCatalogState("empty");
    return;
  }

  const totalPages = Math.ceil(state.filtered.length / PAGE_SIZE);
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * PAGE_SIZE;
  const pageItems = state.filtered.slice(start, start + PAGE_SIZE);

  // Solo se traduce la página visible (no las +1400 citas del catálogo)
  catalogEls.loadingText.textContent = "Traduciendo esta página al español…";
  setCatalogState("loading");

  const translatedItems = await Promise.all(
    pageItems.map(async (q) => ({ ...q, textEs: await translateQuote(q) }))
  );

  catalogEls.grid.innerHTML = translatedItems.map(quoteCardHTML).join("");
  catalogEls.pagerStatus.textContent = `Página ${state.page} de ${totalPages}`;
  catalogEls.prevBtn.disabled = state.page <= 1;
  catalogEls.nextBtn.disabled = state.page >= totalPages;

  setCatalogState("data");
}

function quoteCardHTML(q) {
  return `
    <article class="quote-card">
      <span class="card-stamp">No. ${String(q.id).padStart(4, "0")}</span>
      <p class="card-text">&ldquo;${escapeHTML(q.textEs)}&rdquo;</p>
      <p class="card-author">— ${escapeHTML(q.author)}</p>
    </article>
  `;
}

/** Evita inyección de HTML al insertar texto proveniente de la API. */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Eventos del catálogo
catalogEls.retryBtn.addEventListener("click", loadCatalog);

catalogEls.prevBtn.addEventListener("click", () => {
  state.page -= 1;
  renderCatalogPage();
});

catalogEls.nextBtn.addEventListener("click", () => {
  state.page += 1;
  renderCatalogPage();
});

let searchTimer;
catalogEls.searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const value = e.target.value;
  searchTimer = setTimeout(() => applySearch(value), 250);
});

/* =========================================================
   5. Arranque de la app
   ========================================================= */
function init() {
  loadHeroQuote();
  loadCatalog();
}

document.addEventListener("DOMContentLoaded", init);
