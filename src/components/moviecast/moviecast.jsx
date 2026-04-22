import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import css from './moviecast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovieCast(movieId)
      .then(setCast)
      .catch(err => console.log(err))
  }, [movieId]);

  if (cast === null) return <p>loading cast...</p>;

  if (cast.length === 0) {
    return <p>we don't have any cast information for this movie.</p>;
  }

  const defaultImg = 'https://dl-preview.csdnimg.cn/71105044/0004-944f284d08b98188e13a968600c09199_preview-wide.png';

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : defaultImg}
            alt={name}
            className={css.img}
          />
          <p className={css.name}>{name}</p>
          <p className={css.character}>character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
