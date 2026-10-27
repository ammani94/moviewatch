'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import './style.css';
import axios from 'axios';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState('');
  const { user,isAuthenticated, clearUser, userId } = useUserStore();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  async function callMistralAPI(prompt: string): Promise<string> {
  const reponse = await fetch("/api/mistral", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!reponse.ok) throw new Error("Erreur IA");
  const data = await reponse.json();
  return data.reply;
}

  const display_data = async (data) => {
    setLoading(true);
    try {
      const reply = await callMistralAPI("Faire une suggestion de films et séries à regarder basé sur le film suivant : "+data.title);
      setReply(reply);
    } catch (error) {
      console.log(error);
      setReply('Impossible de contacter l\'API.');
    } finally {
      setLoading(false);
    }
  };

  const AddFavoris = async () => {
    try {
      const response = await axios.post(`${API_URL}/favoris`, {
        "tmdbId":id,
        "userEmail":user,
        "type":"film"
      });
    } catch (error) {
      console.log(error);
      setReply('Impossible de contacter l\'API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;
      try {
        const response = await axios.get(url);
        setMovie(response.data);
        if (isAuthenticated) {
            display_data(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!movie) return <div>Aucun film trouvé.</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`Affiche de ${movie.title}`}
          className="movie-poster"
        />
      )}
      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note : {movie.vote_average}/10</p>
      {reply && <div>{reply}</div>}
      {isAuthenticated ? (<button onClick={AddFavoris}> Ajouter favoris</button>) : (<div></div>)}
    </div>
    
  );
}