import { useState, useEffect } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

/**
* Componente principal de la aplicación.
*/
export default function App() {
  const [watched, setWatched] = useState(InitialWatched());
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useFetchMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  function InitialWatched() {
    const localStorageWatched = localStorage.getItem('watched');
    return localStorageWatched ? JSON.parse(localStorageWatched) : [];
  }

  // ------------------ Complementario -------------------

  function handleRemoveWatched(movieID) {
    setWatched((watched) => {
      const newWatched = watched.filter((movie) => movie.imdbID !== movieID);
      return newWatched;
    });
  }

  function handleAddWatched(movie) {
    setWatched((watched) => {
      const newWatched = [...watched, movie];
      return newWatched;
    });
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));  // Sincroniza watched con localStorage
  }, [watched]);

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>
        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onRemoveWatched={handleRemoveWatched} />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
