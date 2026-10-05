const STATUS_LABEL = {
  Alive: "Vivo",
  Dead: "Fallecido",
  unknown: "Desconocido",
};

export default function CharacterCard({ character }) {
  const { name, image, status, species, gender, origin, location } = character;

  return (
    <article className="character-card">
      <div className="character-card__portal">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="character-card__body">
        <h3 className="character-card__name">{name}</h3>

        <div className="character-card__status">
          <span className={`status-dot status-dot--${status.toLowerCase()}`} />
          <span>
            {STATUS_LABEL[status] ?? status} · {species}
          </span>
        </div>

         <dl className="character-card__meta">
          <div>
            <dt>Género</dt>
            <dd>{gender}</dd>
          </div>
          <div>
            <dt>Última ubicación conocida</dt>
            <dd>{location?.name ?? "Desconocida"}</dd>
          </div>
          <div>
            <dt>Origen</dt>
            <dd>{origin?.name ?? "Desconocido"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
