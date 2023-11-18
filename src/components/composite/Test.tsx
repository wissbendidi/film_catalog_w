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
      <h1 className="w-100 text-4xl m-3 p-3"> 🎬🍿 Movie Library </h1>
      <div className="grid grid-cols-4 gap-4">
        {Object.keys(movies).map((movieId) => {
          const movie = movies[movieId]
          return (
            <div key={movieId}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.posterUrl}`} alt={movie.title} />
              <div className="text-center">
                <div className="font-bold">{movie.title}</div>
                <div>{movie.voteAverage} / 10 ({movie.voteCount} votes)</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

