import { useEffect, useState, useCallback } from "react";
import { getCharacters } from "../api/rickAndMortyApi";

/**
 * Encapsulates the three states the assignment requires:
 * - "loading": request in flight
 * - "success": data arrived and is ready to render
 * - "error":   the request failed (network issue, 404, 500, etc.)
 */
export function useCharacters(page) {
  const [status, setStatus] = useState("loading");
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const data = await getCharacters(page);
      setCharacters(data.results);
      setInfo(data.info);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong while loading characters.");
      setStatus("error");
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, characters, info, errorMessage, retry: fetchData };
}
