export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-panel state-panel--error" role="alert">
      <div className="error-glyph" aria-hidden="true">⚠</div>
      <p className="state-panel__title">El portal colapsó.</p>
      <p className="state-panel__subtitle">{message}</p>
      <button className="retry-button" onClick={onRetry} type="button">
        Reintentar
      </button>
    </div>
  );
}
