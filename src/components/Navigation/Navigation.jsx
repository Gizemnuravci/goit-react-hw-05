import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>home</NavLink>
      <NavLink to="/movies" className={buildLinkClass}>movies</NavLink>
    </nav>
  );
};

export default Navigation;
