import {
  useNowPlayingMovies,
  getMovieTitles,
} from "../../services/movieService";
import { PosterCard } from "./Cards";
import { Link } from "react-router-dom";
import { useState } from "react";

import SearchBar from "./SearchBar";

export function HomePage() {
  const [choices, setChoices] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // Add searchInput state
  const [currentSearchBarValue, changeInputSearch] = useState('') // Add currentSearchBarValue state
  let { movies, isError, isLoading } = useNowPlayingMovies();
  const [foundMovies,setFoundMovies] = useState({} as any)
  const onInputChange = async (value: any) => {
    changeInputSearch(value);
    if(value === ''){
      setFoundMovies({})
      return
    }
    setSearchInput(value)
    const choices = await getMovieTitles(value)
    const choicesTitles = choices.results.map((choice: any) => {return ({
      movieId: choice.id,
      title: choice.title,
    })})
    setFoundMovies(choices.set)
    setChoices(choicesTitles)
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;
  if (movies === null) return <div>Something went wrong...</div>;
  return (
    <main className="flex flex-col gap-6 min-h-screen min-w-full p-4 md:p-12 dark:backgroundBlue">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl mb-2 md:mb-0"> 🎬🍿 Movie Library </h1>
          <span>
            <SearchBar choices={choices} value={currentSearchBarValue} onInputChange={onInputChange} />

          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {Object.keys(Object.keys(foundMovies).length > 0 ? foundMovies : movies).map((movieId) => {
            const movie = Object.keys(foundMovies).length > 0 ? foundMovies[movieId] : movies[movieId];
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
