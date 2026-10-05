/**
 * PokéDex — SPA construida con React (sin build step, vía CDN + Babel standalone).
 * Consume la PokeAPI pública (https://pokeapi.co) con fetch.
 * Aplica temas vistos: fundamentos HTML/CSS/JS, SPA vs MPA, mockup + consumo de
 * API desde el frontend, y ahora componentes reutilizables con un framework (React).
 */

const { useState, useEffect, useCallback } = React;

const API_LIST_URL = "https://pokeapi.co/api/v2/pokemon";
const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const PAGE_SIZE = 20;

function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

// ---------------------------------------------------------------------------
// Presentational components (cada uno con una sola responsabilidad)
// ---------------------------------------------------------------------------

function StatusBar({ state, count }) {
  const label =
    state === "loading" ? "CONECTANDO…" : state === "error" ? "ERROR" : "EN LÍNEA";
  return (
    <div className="screen__statusbar">
      <span className="status-dot" data-state={state === "ready" ? "ready" : state}></span>
      <span className="status-text">{label}</span>
      <span className="status-count">{count > 0 ? `${count} REG.` : ""}</span>
    </div>
  );
}

function SearchBar({ value, onChange, disabled }) {
  return (
    <div className="screen__search">
      <label htmlFor="searchInput" className="sr-only">Buscar Pokémon</label>
      <input
        id="searchInput"
        type="text"
        placeholder="BUSCAR POR NOMBRE…"
        autoComplete="off"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="state state--loading">
      <ul className="skeleton-list" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <li className="skeleton-row" key={i}>
            <span className="skeleton-thumb"></span>
            <span className="skeleton-line"></span>
          </li>
        ))}
      </ul>
      <p className="state__caption">CARGANDO DATOS DEL PROFESOR OAK…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="state state--error">
      <p className="state__glyph">✕</p>
      <p className="state__title">SEÑAL PERDIDA</p>
      <p className="state__desc">{message}</p>
      <button className="btn-retry" type="button" onClick={onRetry}>REINTENTAR</button>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="state state--empty">
      <p className="state__glyph">?</p>
      <p className="state__title">SIN COINCIDENCIAS</p>
      <p className="state__desc">Ningún Pokémon coincide con “{query}”.</p>
    </div>
  );
}

function PokemonRow({ pokemon, onSelect }) {
  return (
    <li>
      <button className="pokemon-row" type="button" onClick={() => onSelect(pokemon)}>
        <span className="pokemon-row__id">#{String(pokemon.id).padStart(3, "0")}</span>
        <img className="pokemon-row__thumb" src={pokemon.sprite} alt="" loading="lazy" />
        <span className="pokemon-row__name">{pokemon.name}</span>
        <span className="pokemon-row__arrow">▶</span>
      </button>
    </li>
  );
}

function PokemonList({ items, onSelect }) {
  return (
    <ul className="pokemon-list">
      {items.map((p) => (
        <PokemonRow key={p.id} pokemon={p} onSelect={onSelect} />
      ))}
    </ul>
  );
}

function DetailPanel({ pokemon, onClose }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setDetail(null);
    setError(false);

    fetch(pokemon.url)
      .then((res) => {
        if (!res.ok) throw new Error(`Estado ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [pokemon]);

  return (
    <aside className="detail-panel" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="detail-panel__card">
        <button className="detail-panel__close" type="button" aria-label="Cerrar" onClick={onClose}>✕</button>
        <div className="detail-panel__content">
          {error && <p className="detail-content__error">NO SE PUDIERON CARGAR LOS DATOS DE ESTE POKÉMON.</p>}
          {!error && !detail && <p className="detail-content__loading">CARGANDO DATOS…</p>}
          {!error && detail && (
            <React.Fragment>
              <div className="detail-content__header">
                <img src={pokemon.sprite} alt="" />
                <div>
                  <p className="detail-content__name">{detail.name}</p>
                  <p className="detail-content__id">
                    #{String(pokemon.id).padStart(3, "0")} · {detail.height / 10} m · {detail.weight / 10} kg
                  </p>
                </div>
              </div>
              <div className="detail-content__types">
                {detail.types.map((t) => (
                  <span className="type-chip" key={t.type.name}>{t.type.name}</span>
                ))}
              </div>
              <div className="detail-content__stats">
                {detail.stats.map((s) => {
                  const pct = Math.min(100, Math.round((s.base_stat / 180) * 100));
                  return (
                    <div className="stat" key={s.stat.name}>
                      <span className="stat__label">{s.stat.name}: {s.base_stat}</span>
                      <div className="stat__bar">
                        <div className="stat__bar-fill" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// App: contenedor con el estado y la lógica de fetch
// ---------------------------------------------------------------------------

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchPage = useCallback(
    async (currentOffset, isFirstLoad) => {
      if (isFirstLoad) setStatus("loading");
      else setIsFetchingMore(true);

      try {
        const res = await fetch(`${API_LIST_URL}?limit=${PAGE_SIZE}&offset=${currentOffset}`);
        if (!res.ok) throw new Error(`La API respondió con estado ${res.status}`);
        const data = await res.json();

        const newEntries = data.results.map((entry) => {
          const id = idFromUrl(entry.url);
          return {
            id: Number(id),
            name: entry.name,
            url: entry.url,
            sprite: `${SPRITE_BASE}${id}.png`,
          };
        });

        setPokemonList((prev) => prev.concat(newEntries));
        setOffset(currentOffset + PAGE_SIZE);
        setHasNext(Boolean(data.next));
        setStatus("ready");
      } catch (err) {
        console.error(err);
        if (isFirstLoad) {
          setErrorMessage("No se pudo conectar con la PokéAPI. Revisa tu conexión e inténtalo de nuevo.");
          setStatus("error");
        } else {
          setErrorMessage("No se pudo cargar la siguiente página. Inténtalo otra vez.");
        }
      } finally {
        setIsFetchingMore(false);
      }
    },
    []
  );

  // Carga inicial (equivalente a componentDidMount)
  useEffect(() => {
    fetchPage(0, true);
  }, [fetchPage]);

  const term = search.trim().toLowerCase();
  const filtered = term ? pokemonList.filter((p) => p.name.includes(term)) : pokemonList;

  return (
    <main className="pokedex" role="application" aria-label="PokéDex">
      <header className="pokedex__top">
        <div className="lens">
          <span className="lens__ring"></span>
          <span className="lens__ring lens__ring--inner"></span>
        </div>
        <div className="small-lights" aria-hidden="true">
          <span className="light light--red"></span>
          <span className="light light--yellow"></span>
          <span className="light light--green"></span>
        </div>
      </header>

      <section className="screen" aria-live="polite">
        <div className="screen__bezel">
          <StatusBar state={status} count={pokemonList.length} />
          <SearchBar value={search} onChange={setSearch} disabled={status !== "ready"} />

          <div className="screen__body">
            {status === "loading" && <LoadingState />}
            {status === "error" && (
              <ErrorState message={errorMessage} onRetry={() => fetchPage(0, true)} />
            )}
            {status === "ready" && filtered.length === 0 && <EmptyState query={search} />}
            {status === "ready" && filtered.length > 0 && (
              <PokemonList items={filtered} onSelect={setSelected} />
            )}
          </div>

          <div className="scanlines" aria-hidden="true"></div>
        </div>
      </section>

      <footer className="pokedex__controls">
        {hasNext && status === "ready" && (
          <button
            className="dpad-btn"
            type="button"
            disabled={isFetchingMore}
            onClick={() => fetchPage(offset, false)}
          >
            {isFetchingMore ? "CARGANDO…" : <React.Fragment>CARGAR MÁS <span className="dpad-btn__arrow">▼</span></React.Fragment>}
          </button>
        )}
        <div className="detail-hint">Toca un Pokémon para ver sus datos</div>
      </footer>

      {selected && <DetailPanel pokemon={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
