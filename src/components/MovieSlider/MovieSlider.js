import React from 'react';
import './MovieSlider.css';

export default function MovieSlider(props){

  let movieSliderItems = [];
  let maxMovieItems = 15;
  let movies = props.movies;

  //========FUNCTIONS====================================

  if (!!movies && movies.length > 0) {
    movies = movies.slice(0,maxMovieItems);

    for (let movie of movies) {
      const imageSrcHost = "https://image.tmdb.org/t/p/w500/";
      const movieImageSrc = `${imageSrcHost}${movie.poster_path}`
      movieSliderItems.push(         
           <div key={movie.id} className="item"><img className='movieThumbnail' src={movieImageSrc} /></div>

       
        )
    }        
}





    return (
      <>
        <div className="slidercontainer">
          {movieSliderItems}
        </div>

      </>
     
      
    )
}