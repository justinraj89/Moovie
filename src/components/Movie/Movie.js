import React from "react";
import "./Movie.css";
import { LinkContainer } from "react-router-bootstrap";

//============================================================

const Movie = (props) => {
  // console.log(props, '<-- movie component props')
  
  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  let linkUrl = "/movie-details/";
  let movieId = props.id;

  //==========================================================

  return (
    <div className="movie image-container">
      <LinkContainer to={linkUrl + movieId}>
        <img src={TMDBImgUrl + props.poster_path} alt={props.title}></img>
      </LinkContainer>

      <div className="overlay d-flex align-items-center justify-content-center">
        Details
      </div>
    </div>
  );
};

export default Movie;
