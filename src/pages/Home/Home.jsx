import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import MovieService from "../../utils/movieService";
import Movie from "../../components/Movie/Movie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SearchForm from '../../components/SearchForm/SearchForm'

const sortRandom = () => {
  const rand = Math.floor(Math.random() * 2);
  return rand === 0 ? -1 : 1;
};
//================================================

function Home({ user, handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  //==========================================
  const fetchTrendingMovies = useCallback(async () => {
    let movies = await MovieService.fetchTrendingMovies();
    setLoading(() => false);
    movies.results = movies.results.sort(sortRandom);
    setMovies(movies.results);
  }, [movies]);

  //----------------------------------------------------------

  const fetchSearchMovies = async (query) => {
    const queryMovies = await MovieService.movieSearch(query);
    console.log(queryMovies);
    setMovies(queryMovies.results);
  };

  //---------------------------------------

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  //=======================================================

  if (loading) {
    return (
      <>
        <Navbar handleLogout={handleLogout} user={user} />
        <LoadingSpinner />
      </>
    );
  }

  //------------------------------------------------------

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} />
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
            <SearchForm fetchSearchMovies={fetchSearchMovies}/>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col>
            <div className="movie-container">
              {movies.length > 0 &&
                movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
