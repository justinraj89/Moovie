import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import MovieService from "../../utils/movieService";

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

  //-------------------------------------------------------------------

  for (let movie of carouselMovies) {
    let carouselItem = (
      <Carousel.Item key={movie.id}>
        <img
          className="d-block w-100"
          src={TMDBImgUrl + movie.backdrop_path}
          alt={movie.title}
        />
      </Carousel.Item>
    );
    carouselItems.push(carouselItem);
  }

  //===================================================

  return <Carousel>{carouselItems}</Carousel>;
}

