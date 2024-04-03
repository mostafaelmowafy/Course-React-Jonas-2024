import { useState, useEffect } from "react";

const KEY = "7f9683e9";

export function useMovies(movieName) {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoding(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${movieName}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          setMovies([]);

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies([]);

          setMovies(data.Search);
          setError("");
          setIsLoding(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoding(false);
        }
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [movieName]
  );
  return { movies, isLoding, error };
}
