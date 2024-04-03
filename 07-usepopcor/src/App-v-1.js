import { useEffect, useState } from "react";
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "7f9683e9";

export default function AppV1() {
  const [movieName, setMovieName] = useState("Avatar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const movie = "Avatar";
  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(movie) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movie.imdbID));
  }
  useEffect(() => {
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
    handleCloseMovie();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [movieName]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search movieName={movieName} setMovieName={setMovieName} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoding && <Loder />}
          {error && <ErrorMessage message={error} />}
          {!isLoding && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
              // onAddWatched={handleAddWatched}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loder() {
  return <p className="loader">Loding...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Search({ movieName, setMovieName }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={movieName}
      onChange={(e) => setMovieName(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length ? movies.length : "0"}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ onCloseMovie, selectedId, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  console.log(isWatched);
  const numberOfRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatched = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      watched: true,
    };
    onAddWatched(newWatched);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "Use Popcorn";
    };
  }, [title]);
  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loder />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${title}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating maxRating={10} onSetRating={setUserRating} />
                    <button
                      className="btn-add"
                      onClick={userRating ? handleAdd : null}
                    >
                      Add to list
                    </button>
                  </>
                ) : (
                  <p>
                    You Rating This Movie: {numberOfRating} <span>⭐</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
}
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onRemoveWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onRemoveWatched(movie)}>
          X
        </button>
      </div>
    </li>
  );
}
