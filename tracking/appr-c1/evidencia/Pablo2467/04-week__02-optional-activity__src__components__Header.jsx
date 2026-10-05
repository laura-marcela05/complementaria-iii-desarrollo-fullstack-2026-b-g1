export default function Header({ page, onPrev, onNext, canGoPrev, canGoNext, totalPages }) {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <span className="eyebrow">Ricky y Morty · División de Registros</span>
            <h1>Lista de Personajes</h1>
        <p className="app-header__subtitle">
         Explorando en muchas partes del multiverso
        </p>
      </div>

      <nav className="pager" aria-label="Page navigation">
        <button type="button" onClick={onPrev} disabled={!canGoPrev}>
           ← Anterior
        </button>
        <span className="pager__label">
           Página {page}
           {totalPages ? ` de ${totalPages}` : ""}
        </span>
        <button type="button" onClick={onNext} disabled={!canGoNext}>
          Siguiente →
        </button>
      </nav>
    </header>
  );
}
