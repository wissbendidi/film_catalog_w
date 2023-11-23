import { SearchMovieTitles, useFetchNowPlayingMoviesService, useFetchMovieDetailsService, useFetchMovieCreditsService, useFetchMovieImagesService, MovieCollection, MovieDetails } from "../repository/movies"

const moviesSet : MovieCollection = {}


export function useNowPlayingMovies() {
  const {movies, isLoading, isError} = useFetchNowPlayingMoviesService()
  if(movies !== undefined){
    for(const movie of movies){
      moviesSet[movie.id] = {
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count
      }
    }
  }
  return {movies: moviesSet, isLoading: isLoading, isError: isError}
}

export function useMovieDetails(movieId: string) {
  const {movieDetails, isLoading, isError} = useFetchMovieDetailsService(movieId)
  if(isLoading || isError) 
    return null
  const movieDetailsSet : MovieDetails = {
    movieId: movieDetails.id,
    title: movieDetails.title,
    posterUrl: movieDetails.poster_path,
    voteAverage: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
    synopsis: movieDetails.overview,
    releaseDate: movieDetails.release_date,
    runtime: movieDetails.runtime,
    genres: movieDetails.genres
  }
  return movieDetailsSet
}

// /* Credits of a movie  */
export function useMovieCredits(movieId: string) {
  const {movieCredits, isLoading, isError} = useFetchMovieCreditsService(movieId)
  return movieCredits
}

export function useMovieImages(movieId: string) {
  const {movieImages, isLoading, isError} = useFetchMovieImagesService(movieId)
  return movieImages
}
export async function getMovieTitles (query : string){
  const movieTitles = await SearchMovieTitles(query)
  console.log('movieTitles : ', movieTitles)
  // convert movieTitles to the same format as moviesSet, so it will be an object with movieId as key and movie as value
  const movieTitlesSet : MovieCollection = {}
  for(const movieTitle of movieTitles.results){
    movieTitlesSet[movieTitle.id] = {
      movieId: movieTitle.id,
      title: movieTitle.title,
      posterUrl: movieTitle.poster_path,
      voteAverage: movieTitle.vote_average,
      voteCount: movieTitle.vote_count
    }
  }
  console.log('movieTitles after modif : ', movieTitlesSet)
  movieTitles['set'] = movieTitlesSet
  return movieTitles
  /* return movieTitles.results.map(movieTitle => {return {
    movieId: movieTitle.id,
    title: movieTitle.title,

  } } ) */
}

