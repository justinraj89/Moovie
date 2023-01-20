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
import SearchForm from "../../components/SearchForm/SearchForm";
//==============================================================

//--------------------

function Home({ user, handleLogout }) {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreMovies = () => {
    setCurrentPage((page) => page + 1);
  };

  const fetchTrendingMovies = async () => {
    let movies = await MovieService.fetchTrendingMovies(currentPage);
    console.log(movies);
    setLoading(() => false);
    setMovies((prev) =>
      currentPage === 1 ? movies.results : [...prev, ...movies.results]
    );
  };

  //----------------------------------------------------------

  const fetchSearchMovies = async (query) => {
    const queryMovies = await MovieService.movieSearch(query);
    setMovies(queryMovies.results);
    setCurrentPage(1)
  };

  //---------------------------------------

  useEffect(() => {
    fetchTrendingMovies();
  }, [currentPage]);


  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreMovies();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
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
            <SearchForm fetchSearchMovies={fetchSearchMovies} />
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
        <br/>
        <br/>
      </Container>
    </>
  );
}

export default Home;      
