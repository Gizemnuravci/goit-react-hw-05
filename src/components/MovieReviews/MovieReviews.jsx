import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError('failed to load reviews.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (isLoading) return <p>loading reviews...</p>;

  if (error) return <p>{error}</p>;

  if (reviews.length === 0) {
    return <p>we don't have any reviews for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <p className={css.author}>author: {author}</p>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
