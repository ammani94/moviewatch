'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './globals.css';
import Movies from '../components/movies';
import Series from '../components/series';


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`;

      try {
        const response = await axios.get(url);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchPopularTv = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR`;

      try {
        const response = await axios.get(url);
        setTv(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPopularMovies();
    fetchPopularTv();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <h1>Films</h1>
      <Movies movies={movies} />
      <h1>Séries</h1>
      <Series series={tv} />
    </div>
  );
}