export default function LoadingState() {
  return (
    <div className="state-panel state-panel--loading" role="status" aria-live="polite">
      <div className="portal-spinner" aria-hidden="true">
        <span className="portal-spinner__ring" />
      </div>
      <p className="state-panel__title">Abriendo un portal hacia los Registros Ciudadanos…</p>
      <p className="state-panel__subtitle">Obteniendo datos de la base de datos del multiverso.</p>
    </div>
  );
}
