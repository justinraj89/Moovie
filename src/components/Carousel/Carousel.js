import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import MovieService from "../../utils/movieService";
import { LinkContainer } from "react-router-bootstrap";
//=========================================================

const sortRandom = () => {
  const rand = Math.floor(Math.random() * 2);
  return rand === 0 ? -1 : 1;
};

//==========================================================

export default function MovieCarousel() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";
  let linkUrl = "/movie-details/";

  let carouselMovies = popularMovies.sort(sortRandom);
  carouselMovies = popularMovies.slice(0, 5);
  let carouselItems = [];

  //==============================================================

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popMovies = await MovieService.fetchPopularMovies();
      setLoading(() => false);
      setPopularMovies(popMovies.results);
    };
    fetchPopularMovies();
  }, []);

  console.log(popularMovies);

  //-------------------------------------------------------------------

  for (let movie of carouselMovies) {
    let carouselItem = (
      <Carousel.Item key={movie.id} className="carousel-link">
        <LinkContainer to={linkUrl + movie.id} >
        <img
          className="d-block w-100"
          src={TMDBImgUrl + movie.backdrop_path}
          alt={movie.title}
        />
        </LinkContainer>
        <Carousel.Caption>
          <LinkContainer to={linkUrl + movie.id} >
            <h2>{movie.title}</h2>
          </LinkContainer>
        </Carousel.Caption>
      </Carousel.Item>
    );
    carouselItems.push(carouselItem);
  }

  //===================================================

  return <Carousel>{carouselItems}</Carousel>;
}
