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
    <main className="flex flex-col gap-6 min-h-screen min-w-full p-4 md:p-12 dark:bg-gray-800">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-0"> 🎬🍿 Movie Library </h1>
          <span>
            <SearchBar choices={choices} onInputChange={onInputChange} />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </main>
  );
}
