import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../movies';

import css from '../MovieReviews/MovieReviews.module.css';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const reviewMemo = useMemo(() => reviews, [reviews]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetchMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <p>Error fetching reviews.</p>}
      {reviews.length > 0 ? (
        <div className={css.container}>
          <h2 className={css.title}>Reviews</h2>
          {reviewMemo.map(review => (
            <div key={review.id}>
              <p className={css.author}>Author: {review.author}</p>
              <p className={css.content}>{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={css.title}>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
}
