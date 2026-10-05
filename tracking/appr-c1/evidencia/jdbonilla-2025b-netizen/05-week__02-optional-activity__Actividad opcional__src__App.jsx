import { useState } from 'react'

const API_BASE = 'https://restcountries.com/v3.1/name'

function formatPopulation(num) {
  return new Intl.NumberFormat('es-CO').format(num)
}

function formatCurrencies(currencies) {
  if (!currencies) return '—'
  return Object.values(currencies)
    .map((c) => `${c.name} (${c.symbol ?? '—'})`)
    .join(', ')
}

function formatLanguages(languages) {
  if (!languages) return '—'
  return Object.values(languages).join(', ')
}

export default function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | data | error
  const [country, setCountry] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    const term = query.trim()
    if (!term) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(
        `${API_BASE}/${encodeURIComponent(term)}?fields=name,capital,region,population,flags,currencies,languages`
      )

      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? `No se encontró ningún país llamado "${term}".`
            : `La API respondió con un error (código ${res.status}).`
        )
      }

      const json = await res.json()
      const result = Array.isArray(json) ? json[0] : json
      setCountry(result)
      setStatus('data')
    } catch (err) {
      setErrorMsg(err.message || 'Ocurrió un error al consultar la API.')
      setStatus('error')
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <span className="hero__mark" aria-hidden="true">
          &#9673;
        </span>
        <h1>Atlas</h1>
        <p className="hero__subtitle">Escribe el nombre de un país y consulta sus datos en tiempo real.</p>
      </header>

      <form className="search" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: Colombia, Japan, Kenya..."
          aria-label="Nombre del país"
        />
        <button type="submit" disabled={status === 'loading'}>
          Buscar
        </button>
      </form>

      <section className="result" aria-live="polite">
        {status === 'idle' && (
          <p className="hint">Los resultados de tu búsqueda aparecerán aquí.</p>
        )}

        {status === 'loading' && (
          <div className="skeleton">
            <div className="skeleton__flag" />
            <div className="skeleton__lines">
              <div className="skeleton__line skeleton__line--wide" />
              <div className="skeleton__line" />
              <div className="skeleton__line" />
              <div className="skeleton__line" />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="error-box">
            <strong>No fue posible cargar el país.</strong>
            <p>{errorMsg}</p>
          </div>
        )}

        {status === 'data' && country && (
          <article className="card">
            <img
              className="card__flag"
              src={country.flags?.svg || country.flags?.png}
              alt={`Bandera de ${country.name?.common}`}
            />
            <div className="card__body">
              <h2>{country.name?.common}</h2>
              <p className="card__official">{country.name?.official}</p>

              <dl className="card__facts">
                <div>
                  <dt>Capital</dt>
                  <dd>{country.capital?.[0] ?? '—'}</dd>
                </div>
                <div>
                  <dt>Región</dt>
                  <dd>{country.region ?? '—'}</dd>
                </div>
                <div>
                  <dt>Población</dt>
                  <dd>{country.population ? formatPopulation(country.population) : '—'}</dd>
                </div>
                <div>
                  <dt>Idiomas</dt>
                  <dd>{formatLanguages(country.languages)}</dd>
                </div>
                <div>
                  <dt>Moneda</dt>
                  <dd>{formatCurrencies(country.currencies)}</dd>
                </div>
              </dl>
            </div>
          </article>
        )}
      </section>

      <footer className="footer">
        Datos de <a href="https://restcountries.com" target="_blank" rel="noreferrer">REST Countries API</a>
      </footer>
    </div>
  )
}
