import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation';

const HomePage = lazy(() => import('./pages/homepage/homepage.jsx'));
const MoviesPage = lazy(() => import('./pages/moviespage/moviespage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/moviedetailspage/moviedetailspage.jsx'));
const NotFoundPage = lazy(() => import('./pages/notfoundpage/notfoundpage.jsx'));
const MovieCast = lazy(() => import('./components/moviecast/moviecast.jsx'));
const MovieReviews = lazy(() => import('./components/moviereviews/moviereviews.jsx'));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
