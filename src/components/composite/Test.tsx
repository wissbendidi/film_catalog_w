import { useNowPlayingMovies, useMovieDetails } from "../../services/movieService"
import { PosterCard } from "./Cards"
import { Link } from "react-router-dom"

import SearchBar from '../../components/composite/SearchBar';
export function Test(){
  const {movies,isError,isLoading} = useNowPlayingMovies()
  //const movieIdExists = movies !== undefined && Object.keys(movies).length > 0
  //const movieId = movieIdExists ? movies[Object.keys(movies)[0]]['movieId'] : ''
  //const movie1details = useMovieDetails(movieId)
  
  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Something went wrong...</div>

  //console.log(movies)
  //console.log('Movie details : ', movie1details)
  return (
    <div>
      <div className="flex justify-between items-center w-full mb-10">
        <h1 className="text-4xl"> 🎬🍿 Movie Library </h1>
        <span>
          <SearchBar/>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {Object.keys(movies).map((movieId) => {
          const movie = movies[movieId]
          return (
            <Link key={movieId} to={`/movie/${movieId}`}>
              <PosterCard posterUrl={`https://image.tmdb.org/t/p/w500/${movie.posterUrl}`} voteAverage={movie.voteAverage} voteCount={movie.voteCount} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

