import MovieCart from '../MovieCart/MovieCart';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <MovieCart movie={movie} />
        </li>
      ))}
    </ul>
  );
}
