import {
  useNowPlayingMovies,
  getMovieTitles,
} from "../../services/movieService";
import { PosterCard } from "./Cards";
import { Link } from "react-router-dom";
import { useState } from "react";

import SearchBar from "../../components/composite/SearchBar";
export function Test() {
  const [choices, setChoices] = useState([]);
  const  onInputChange = async (event : any) => {
    const  choices = await getMovieTitles(event.target.value);
    setChoices(choices);
  };

  const { movies, isError, isLoading } = useNowPlayingMovies();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;
  if (movies === null) return <div>Something went wrong...</div>;

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-10">
        <h1 className="text-4xl"> 🎬🍿 Movie Library </h1>
        <span>
          <SearchBar choices={choices} onInputChange={onInputChange} />
        </span>
      </div>
      <div className="grid grid-cols-6 gap-8">
        {Object.keys(movies).map((movieId) => {
          const movie = movies[movieId];
          return (
            <Link key={movieId} to={`/movie/${movieId}`}>
              <PosterCard
                posterUrl={`https://image.tmdb.org/t/p/w500/${movie.posterUrl}`}
                voteAverage={movie.voteAverage}
                voteCount={movie.voteCount}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
