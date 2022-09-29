import React from "react";
import "./WatchlistMovie.css";
import { LinkContainer } from "react-router-bootstrap";

//============================================================

const WatchListMovie = (props) => {

  let linkUrl = "/movie-details/";
  let movieId = props.movieId;

  //==========================================================

  return (
    <div className="movie image-container">
      <LinkContainer to={linkUrl + movieId}>
        <img src={props.movieImg} alt={props.movieTitle}></img>
      </LinkContainer>

      <div className="overlay d-flex align-items-center justify-content-center">
        Details
      </div>
    </div>
  );
};

export default WatchListMovie;
