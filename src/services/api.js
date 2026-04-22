import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-us",
  },
});

export const getTrendingMovies = async () => {
  const { data } = await instance.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await instance.get("/search/movie", { params: { query } });
  return data.results;
};

export const getMovieDetails = async (id) => {
  const { data } = await instance.get(`/movie/${id}`);
  return data;
};

export const getMovieCast = async (id) => {
  const { data } = await instance.get(`/movie/${id}/credits`);
  return data.cast;
};

export const getMovieReviews = async (id) => {
  const { data } = await instance.get(`/movie/${id}/reviews`);
  return data.results;
};
