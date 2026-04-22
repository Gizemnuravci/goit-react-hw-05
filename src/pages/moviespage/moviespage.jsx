import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/movielist/movielist';
import css from './moviespage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    const fetchSearch = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearch();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = e.target.elements.search.value.trim();
    setSearchParams(val ? { query: val } : {});
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input name="search" defaultValue={query} className={css.input} />
        <button type="submit" className={css.btn}>search</button>
      </form>
      {isLoading && <p>searching...</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
