import Link from 'next/link';

export default function Series({ series }) {
  if (!series || series.length === 0) {
    return <div>Aucune série à afficher.</div>;
  }

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const topFiveMovies = series.slice(0, 5);

  return (
    <div>

      <div className="top-movies-container">
        {topFiveMovies.map((serie) => (
          <div key={serie.id} className="movie-card">
            <Link href={`/tv/${serie.id}`}><img
              src={`${imageBaseUrl}${serie.poster_path}`}
              alt={`Affiche de ${serie.name}`}
              className="movie-poster"
            /></Link>
            <div className="movie_footer">
              <h2 className="movie_footer_title">{serie.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}