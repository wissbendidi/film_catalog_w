import { useNowPlayingMovies, useMovieDetails } from "../../services/movieService"

export function Test(){
  const {movies,isError,isLoading} = useNowPlayingMovies()
  const movieIdExists = movies !== undefined && Object.keys(movies).length > 0
  const movieId = movieIdExists ? movies[Object.keys(movies)[0]]['movieId'] : ''
  const movie1details = useMovieDetails(movieId)
  
  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Something went wrong...</div>

  console.log(movies)
  console.log('Movie details : ', movie1details)

  return (
    <div>
      <h1 className="underline"> Scooby-doo by-doo !</h1>
    </div>
  )
}

