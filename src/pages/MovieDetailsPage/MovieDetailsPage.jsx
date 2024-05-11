import { useState, useEffect, useRef, Suspense } from 'react';
import {
  useParams,
  Link,
  useLocation,
  Outlet,
  NavLink,
} from 'react-router-dom';
import { getMovieById } from '../../movies';

import { FaArrowLeftLong } from 'react-icons/fa6';

import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import clsx from 'clsx';
import Loader from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  const getNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <b>Error...</b>}
      <div className={css.button}>
        <Link to={backLinkURLRef.current} className={css.linkDescr}>
          <p className={css.back}>
            <FaArrowLeftLong />
            Go back
          </p>
        </Link>
      </div>
      {movie && (
        <div className={css.container}>
          <div className={css.divLinks}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.overview}
            />
            <div className={css.divDescr}>
              <div>
                <h1 className={css.title}>{`${
                  movie.title
                } (${movie.release_date.slice(0, 4)})`}</h1>
                <p className={css.userScore}>
                  User score: {(movie.vote_average * 10).toFixed() + '%'}
                </p>
                <h2 className={css.overview}>Overview</h2>
                <p className={css.descr}>{movie.overview}</p>
                <h2 className={css.overview}>Genres</h2>
                <ul className={css.list}>
                  {movie.genres.map(genre => (
                    <li className={css.descr} key={genre.id}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={css.infoDiv}>
                <h2 className={css.overview}>Additional information</h2>
                <nav className={css.navLink}>
                  <NavLink className={getNavLinkClass} to="cast">
                    Cast
                  </NavLink>
                  <NavLink className={getNavLinkClass} to="reviews">
                    Review
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
