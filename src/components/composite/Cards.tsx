import React from 'react';
import { PropsWithChildren } from 'react';

interface PosterCardProps extends PropsWithChildren {
  width?: string | number;
  height?: string | number;
  posterUrl: string;
  title?: string;
  voteAverage: number;
  voteCount: number;
}
export function PosterCard({width, height, posterUrl, title, voteAverage } : PosterCardProps){
  let voteAverageString = voteAverage.toString()
  if(voteAverageString.length > 3){
    voteAverageString = voteAverageString.substring(0, 3)
  }
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-all duration-200 ease-in-out">
      <img src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt={title} className="object-cover" />
      
      <div className="absolute bottom-2 right-2 bg-backgroundBlue dark:bg-white bg-opacity-75 rounded-full flex items-center">
        <svg width="36" height="36">
          <circle cx="18" cy="18" r="15" stroke="grey" strokeWidth="3" fill="transparent" />
          <circle 
            cx="18" 
            cy="18" 
            r="15" 
            stroke="#11ff00" 
            strokeWidth="3" 
            fill="transparent"
            strokeDasharray={`${voteAverage * 9.42}, 100`}
            transform="rotate(-90) translate(-36)"
          />
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="stroke-white dark:stroke-black">{voteAverageString}</text>
        </svg>
        
      </div>
    </div>
  );
};

export default PosterCard;