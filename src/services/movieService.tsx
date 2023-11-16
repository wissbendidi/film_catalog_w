import { useQuery } from '@tanstack/react-query'


async function fetchNowPlayingMovies(){
  const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2021-07-01&release_date.lte=2021-07-31', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGJkY2Q2NmI0OGIzYWYzMDVkZTg5Y2FhYTZkOTMyZiIsInN1YiI6IjY1NTNkMjhjYWQ1MGYwMDEyNTJiNGI2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A6uEvVOJPxkXCSz5PARFAofx3h7ZU5M--OZUy_TEfbc'
    }
  })
  return res.json()
}


export function useFetchNowPlayingMoviesService() {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['nowPlayingMovies'], 
    queryFn: fetchNowPlayingMovies
  })
  return { movies:data?.results, isLoading, isError }
}
