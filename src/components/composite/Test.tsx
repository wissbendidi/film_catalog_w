import { useFetchNowPlayingMoviesService } from "../../services/movieService"

export function Test(){
  const {movies,isError,isLoading} = useFetchNowPlayingMoviesService()

  if(isLoading) return <div>Loading...</div>

  if(isError) return <div>Something went wrong...</div>

  console.log(movies)

  return (
    <div>
      <h1 className="underline"> Scooby-doo by-doo !</h1>
    </div>
  );
};

