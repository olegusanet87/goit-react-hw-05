import { Link, useLocation } from 'react-router-dom';
import css from './MovieCart.module.css';

export default function MovieCart({ movie }) {
  const location = useLocation();

  return (
    <Link to={`/movies/${movie.id}`} className={css.cart} state={location}>
      <div className={css.container}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={''}
        />
        <div className={css.divTitle}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.year}>{movie.release_date.slice(0, 4)}</p>
        </div>
      </div>
    </Link>
  );
}
