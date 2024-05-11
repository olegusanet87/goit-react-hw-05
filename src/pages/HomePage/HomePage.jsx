import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../movies';
import css from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesEffect() {
      try {
        setLoading(true);
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesEffect();
  }, []);

  return (
    <div className={css.container}>
      <h2 className={css.header}>Trending today</h2>
      {loading && <Loader />}
      {error && <div className={css.error}>Error fetching movies.</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
