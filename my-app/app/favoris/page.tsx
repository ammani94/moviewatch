'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import Movies from '../../components/movies';
import Series from '../../components/series';

export default function FavorisPage() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserStore();

  const fetchMovieDetails = async (tmdbId) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    console.log(apiKey);
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=fr-FR`;

    try {
      const response = await axios.get(url);
      setMovies((prevMovies) => {
        const newMovies = [...prevMovies, response.data];
        return [...new Map(newMovies.map((movie) => [movie.id, movie])).values()];
      });
    } catch (error) {
      console.error("Erreur :", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchTvDetails = async (tmdbId) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${apiKey}&language=fr-FR`;

    try {
      const response = await axios.get(url);
      setTv((prevMovies) => {
        const newMovies = [...prevMovies, response.data];
        return [...new Map(newMovies.map((movie) => [movie.id, movie])).values()];
      });
    } catch (error) {
      console.error("Erreur :", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const GetFavoris = async () => {
      try {
        const response = await axios.post('http://localhost:3001/getfavoris', {
          userEmail: user,
        });

        const items = response.data.items;
        await Promise.all(items.map((element) => {
            if (element.type === "film") {
              fetchMovieDetails(element.tmdbId);
            } else {
              fetchTvDetails(element.tmdbId)
            }
          } 
        ));

      } catch (error) {
        console.log(error);
        setError('Impossible de contacter l\'API.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      GetFavoris();
    }
  }, [user]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (movies.length === 0) return <div>Aucun film trouvé.</div>;
  return (
    <div className="movie-details">
      <Movies movies={movies} />
      <Series series={tv} />
    </div>
  );
}