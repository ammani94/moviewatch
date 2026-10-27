import Link from 'next/link';

export default function Movies({ movies }) {
  if (!movies || movies.length === 0) {
    return <div>Aucun film à afficher.</div>;
  }
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const topFiveMovies = movies.slice(0, 5);

  return (
    <div>

      <div className="top-movies-container">
        {topFiveMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link href={`/movie/${movie.id}`}><img
              src={`${imageBaseUrl}${movie.poster_path}`}
              alt={`Affiche de ${movie.title}`}
              className="movie-poster"
            /></Link>
            <div className="movie_footer">
              <h2 className="movie_footer_title">{movie.title}</h2>
              <h2 className="movie_footer_title">{movie.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}