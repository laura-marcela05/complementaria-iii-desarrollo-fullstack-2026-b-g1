import { useState } from "react";
import Header from "./components/Header";
import CharacterList from "./components/CharacterList";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { useCharacters } from "./hooks/useCharacters";
import "./App.css";

export default function App() {
  const [page, setPage] = useState(1);
  const { status, characters, info, errorMessage, retry } = useCharacters(page);

  return (
    <div className="app-shell">
      <Header
        page={page}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
        canGoPrev={page > 1 && status !== "loading"}
        canGoNext={Boolean(info?.next) && status !== "loading"}
        totalPages={info?.pages}
      />

      <main className="app-main">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState message={errorMessage} onRetry={retry} />}
        {status === "success" && <CharacterList characters={characters} />}
      </main>

      <footer className="app-footer">
        Datos proporcionados por:{" "}
        <a href="https://rickandmortyapi.com" target="_blank" rel="noreferrer">
          The Rick and Morty API
        </a>
      </footer>
    </div>
  );
}
