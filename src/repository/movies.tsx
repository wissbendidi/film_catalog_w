import { useQuery } from '@tanstack/react-query'
import { TMDBAuthorizationBearer } from '../../config'


/*  Type definitions  */

export interface Movie {
  movieId:  string,
  title: string,
  posterUrl: string,
  voteAverage: number,
  voteCount: number
}

export interface MovieDetails extends Movie {
  synopsis: string,
  releaseDate: string,
  runtime: number,
  genres: string[]
}

export interface MovieCollection {
  [key: string]: Movie
}

/* HTTP API Calls */

/*  Now playing movies  */
async function fetchNowPlayingMovies(){
  //console.log('HTTP CALL !')
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2021-07-01&release_date.lte=2021-07-31', {
    headers: {
      Authorization: TMDBAuthorizationBearer
    }
  })
  return res.json()
}

export function useFetchNowPlayingMoviesService() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['nowPlayingMovies'], 
    queryFn: fetchNowPlayingMovies
  })
  console.log('Films : ', data?.results)
  return { movies: data?.results, isLoading, isError }
}

/* Details of a movie  */
async function fetchMovieDetails(movieId: string){
  console.log('Fetching details of movie : ', movieId)
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDBAuthorizationBearer
    }
  }
  const res = await fetch(url, options)
  return res.json()
}

export function useFetchMovieDetailsService(movieId: string) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieDetails', movieId], 
    queryFn: () => fetchMovieDetails(movieId)
  })
  return { movieDetails: data, isLoading, isError }
}
