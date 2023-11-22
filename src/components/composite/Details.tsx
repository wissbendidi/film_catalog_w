
import { useMovieDetails } from "../../services/movieService";
import { useParams } from "react-router-dom";
import { PosterCard } from "./Cards";

export function Details() {
  const { movieId = '' }  = useParams();
  const movie = useMovieDetails(movieId);
  if (movie === null) return <div>Loading...</div>;
  return (
    <>
      <div className="grid grid-rows-3 grid-cols-7 gap-2">
        <div className="col-span-1" style={{border: '1px solid red'}}>
          <PosterCard posterUrl={`https://image.tmdb.org/t/p/w500/${movie.posterUrl}`} voteAverage={movie.voteAverage} voteCount={movie.voteCount} />
        </div>
        <div className="col-span-6 grid grid-rows-2 gap-2" style={{border: '1px solid blue'}}>
          <div className="row-span-1"></div>
          <div className="row-span-1 flex justify-start p-2 grid grid-rows-4" style={{border: '1px solid orange'}}>
            <h3 className="row-span-1 text-2xl">{movie.title}</h3>
            <span className="row-span-1"></span>
            <span className="row-span-1">{movie.synopsis}</span>
            <span className="row-span-1">{movie.releaseDate}</span>
          </div>
        </div>
      </div>
    </>
  );
}