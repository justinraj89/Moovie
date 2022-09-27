import React, { useState, useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import MovieService from "../../utils/movieService";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const MovieDetails = () => {
  const [movie, setMovie] = useState("");

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetail = await MovieService.getMovieDetails(id);
      console.log(movieDetail, "<---MOVIE DETAILS");
      console.log(movieDetail.genres[0].name)
      setMovie(movieDetail);
    };
    fetchMovieDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <img className="detailsImg" src={TMDBImgUrl + movie.poster_path} alt={movie.title}></img>
          </Col>
          <Col>
            <ul>
              <li className="movieInfo">
                <span className="movieInfoTitles">TITLE: </span>
                {movie.title}
              </li>
              <br/>
              <li className="movieInfo">
                <span className="movieInfoTitles">OVERVIEW: </span>
                {movie.overview}
              </li>
              <br/>
              <li className="movieInfo">
                <span className="movieInfoTitles">RELEASE DATE: </span>
                {movie.release_date}
              </li>
              <br/>
              <Button variant="secondary">Add to your Watchlist</Button>{' '}
            </ul>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetails;
