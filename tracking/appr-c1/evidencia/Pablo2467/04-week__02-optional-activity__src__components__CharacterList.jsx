import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters }) {
  if (characters.length === 0) {
    return (
      <div className="state-panel">
        <p className="state-panel__title">No se encontraron ciudadanos en esta dimensión.</p>
      </div>
    );
  }

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  );
}
