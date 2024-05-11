import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../movies';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const castMemo = useMemo(() => cast, [cast]);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {error && <p>Error fetching cast.</p>}
      <div className={css.container}>
        <h2 className={css.title}>Cast</h2>
        <ul className={css.list}>
          {castMemo.map(actor => (
            <li className={css.card} key={actor.id}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt=""
              />
              <p className={css.name}>{actor.name}</p>
              <p className={css.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
