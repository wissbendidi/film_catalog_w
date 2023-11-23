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
  const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
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
  return { movies: data?.results, isLoading, isError }
}

/* Details of a movie  */
async function fetchMovieDetails(movieId: string){
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
  if(movieId === '') return { movieDetails: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieDetails', movieId], 
    queryFn: () => fetchMovieDetails(movieId)
  })
  return { movieDetails: data, isLoading, isError }
}

async function fetchMovieCredits(movieId: string){
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
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

export async function SearchMovieTitles(query: string){
  console.log('Searching the titles of movies : ', query)
  if(query === '') return null
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
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

export function useFetchMovieCreditsService(movieId: string) {
  if(movieId === '') return { movieCredits: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieCredits', movieId], 
    queryFn: () => fetchMovieCredits(movieId)
  })
  return { movieCredits: data, isLoading, isError }
}

async function fetchMovieImages(movieId: string){
  const url = `https://api.themoviedb.org/3/movie/${movieId}/images`
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

export function useFetchMovieImagesService(movieId: string) {
  if(movieId === '') return { movieImages: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['movieImages', movieId], 
    queryFn: () => fetchMovieImages(movieId)
  })
  return { movieImages: data, isLoading, isError }
}

export function useFSearchMovieTitlesService(query: string) {
  if(query === '') return { movieTitles: null, isLoading: false, isError: false }
  const {data, isLoading, isError} = useQuery({
    queryKey: ['SearchMovieTitles', query], 
    queryFn: () => SearchMovieTitles(query)
  })
  console.log('SEARCH : res.json() : ', data)
  return {movieTitles: data, isLoading, isError }
}

