import React from "react";
import "./Movie.css";
import { LinkContainer } from "react-router-bootstrap";
//============================================================

const Movie = (props) => {
  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  let linkUrl = "/movie-details/";
  let movieId = props.id;

  //==========================================================

  return (
    <div className="movie image-container">
      <LinkContainer to={linkUrl + movieId}>
        <img
          className="poster-path"
          src={TMDBImgUrl + props.poster_path}
          alt={props.title}
        ></img>
      </LinkContainer>
      <LinkContainer to={linkUrl + movieId}>
        <div className="overlay d-flex align-items-center justify-content-center">
          Details
        </div>
      </LinkContainer>
    </div>
  );
};

export default Movie;
