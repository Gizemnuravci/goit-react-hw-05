import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import css from './moviereviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(setReviews)
      .catch(err => console.log(err))
  }, [movieId]);

  if (reviews === null) return <p>loading reviews...</p>;

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
