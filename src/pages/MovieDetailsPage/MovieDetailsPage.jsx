import { useEffect, useRef, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation, NavLink } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('failed to load movie details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) return <div>loading...</div>;

  if (error) return <div>{error}</div>;

  if (!movie) return null;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.back}>go back</Link>
      <div className={css.details}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width="300" />
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>user score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
      <hr />
      <h3>additional information</h3>
      <ul>
        <li><NavLink to="cast">cast</NavLink></li>
        <li><NavLink to="reviews">reviews</NavLink></li>
      </ul>
      <Suspense fallback={<div>loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
