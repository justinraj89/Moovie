import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import MovieService from "../../utils/movieService";
import Movie from "../../components/Movie/Movie";




function Home() {
  const [movies, setMovies] = useState([]);

  //==========================================

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await MovieService.fetchTrendingMovies();
      // console.log(movies, "<-- from fetch trending movies");
      setMovies(movies.results);
    };
    fetchTrendingMovies();
  }, []);



  //================================================

  return (
    <>
      <Navbar />
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <Carousel />
          </Col>
        </Row>

        <br />
        <br />
        <br />

        <Row>
          <Col>
            <h2>Looking for something to Watch?</h2>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <h3>Todays Top Picks</h3>
            <div className="movie-container">
                {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
          </Col>
        </Row>


      </Container>
    </>
  );
}

export default Home;
