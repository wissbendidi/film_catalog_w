
import { useMovieDetails, useMovieCredits, useMovieImages  } from "../../services/movieService";
import { useParams, useNavigate } from "react-router-dom";
import { PosterCard } from "./Cards";
import moment from "moment";

export function Details() {
  const navigate = useNavigate();
  const { movieId = '' }  = useParams();
  const movie = useMovieDetails(movieId);
  const movieCredits = useMovieCredits(movieId);
  const movieImagesObject = useMovieImages(movieId);
  const movieImages = movieImagesObject?.backdrops;
  const backgroundImageUrl = `https://image.tmdb.org/t/p/w500/${movie?.posterUrl}`

  if (movie === null || movieCredits === null || movieImagesObject === null) return <div>Loading...</div>;
  if (movie === undefined || movieCredits === undefined || movieImagesObject === undefined) return <div>Something went wrong...</div>;
  movieCredits.cast = movieCredits.cast.filter((castMember: any) => castMember.profile_path !== null)
  movieCredits.cast.sort((a: any, b: any) => b.popularity - a.popularity)

  movie.releaseDate = moment(movie.releaseDate).format('ll')
  return (
    <div className="relative">
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          filter: 'blur(8px)',
          margin: '-10%',
          zIndex: 0
        }}
      ></div>
      <div className="flex items-left">
        <button className="relative top-0 left-0 m-4 ml-0 p-2 bg-black text-white rounded-[12px] shadow-lg" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="ml-2">Back</span>
        </button>
      </div>
      <div className="relative grid grid-rows-3 grid-cols-1">
        <div className="flex row-span-1 w-full h-fit">
          <div className="w-1/6">
            <PosterCard posterUrl={`https://image.tmdb.org/t/p/w500/${movie.posterUrl}`} voteAverage={movie.voteAverage} voteCount={movie.voteCount} />
          </div>
          <div className="w-5/6 text-left">
            <div className="h-3/6"></div>
            <div className="h-3/6">
              <h3 className="text-2xl m-3">{movie.title}</h3>
              <div className="m-3 overflow-auto">{movie.synopsis}</div>
              <p className="m-3">{movie.releaseDate}</p>
            </div>
          </div>
        </div>
        <div className="row-span-1 mt-20">
          <span className="flex w-full text-left text-3xl m-0 p-0">Credits</span>
          <div className="flex overflow-x-auto">
            {movieCredits?.cast.map((castMember: any) => (
              <div key={castMember.id} className="flex-none w-32 m-2">
                <PosterCard 
                  posterUrl={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`} 
                  voteAverage={castMember.popularity} 
                  voteCount={castMember.id} 
                />
                <div className="text-center m-1">
                  <p className="text-sm">{castMember.name}</p>
                  <p className="text-xs">{castMember.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row-span-1">
          <span className="flex w-full text-left text-3xl">Images</span>
          <div className="flex overflow-x-auto">
            {movieImages?.map((image: any) => (
              <div key={image.file_path} className="flex-none m-2">
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} 
                  alt="Movie Image" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}