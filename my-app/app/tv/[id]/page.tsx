'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import axios from 'axios';
import './style.css';
export default function TvDetailsPage() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user,isAuthenticated, clearUser, userId } = useUserStore();

  const AddFavoris = async () => {
      try {
        const response = await axios.post('http://localhost:3001/favoris', {
          "tmdbId":id,
          "userEmail":user,
          "type":"tv"
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setReply('Impossible de contacter l\'API.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const fetchTvDetails = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`;

      try {
        const response = await axios.get(url);
        setTv(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchTvDetails();
    }
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!tv) return <div>Aucune série trouvée.</div>;

  return (
    <div className="movie-details">
      <h1>{tv.name}</h1>
      {tv.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={`Affiche de ${tv.name}`}
          className="movie-poster"
        />
      )}
      <p>{tv.overview}</p>
      <p>Note : {tv.vote_average}/10</p>
      {isAuthenticated ? (<button onClick={AddFavoris}> Ajouter favoris</button>) : (<div></div>)}
    </div>
  );
}