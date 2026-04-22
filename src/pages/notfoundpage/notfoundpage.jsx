import { Link } from 'react-router-dom';
import css from './notfoundpage.module.css';

const NotFoundPage = () => (
  <div className={css.container}>
    <h1>404 - page not found</h1>
    <Link to="/">go back to home</Link>
  </div>
);

export default NotFoundPage;
