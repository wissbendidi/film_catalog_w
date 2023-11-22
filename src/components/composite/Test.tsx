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
  const  onInputChange = async (event) => {
    console.log(`got ${JSON.stringify(event.target.value)}`);
    const  choices = await getMovieTitles(event.target.value);

    setChoices(choices);
  };

  const { movies, isError, isLoading } = useNowPlayingMovies();
  //const movieIdExists = movies !== undefined && Object.keys(movies).length > 0
  //const movieId = movieIdExists ? movies[Object.keys(movies)[0]]['movieId'] : ''
  //const movie1details = useMovieDetails(movieId)

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong...</div>;

  //console.log(movies)*ù$
  //console.log('Movie details : ', movie1details)
  return (
    <div>
      <div className="flex justify-between items-center w-full mb-10">
        <h1 className="text-4xl"> 🎬🍿 Movie Library </h1>
        <span>
          <SearchBar choices={choices} onInputChange={onInputChange} />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-8">
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
