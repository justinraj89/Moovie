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
  const [search, setSearch] = useState('')

  //==========================================

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await MovieService.fetchTrendingMovies();
      // console.log(movies, "<-- from fetch trending movies");
      setMovies(movies.results);
    };
    fetchTrendingMovies();
  }, []);


  // const fetchSearchMovie = async (query) => {
  //   const searchResults = await MovieService.movieSearch(query)
  //   console.log(searchResults)
  // }

  //===================================================


  const handleSubmit =  (e) => {
    e.preventDefault();
    
    
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  };


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

            <div className="searchform-container">
              <form onSubmit={handleSubmit} className="searchAuth-form">
                <div className="Auth-form-content">
                  <div className="form-group mt-3">
                    <input
                      name="search"
                      value={search}
                      onChange={handleChange}
                      className="form-control mt-1"
                      placeholder="Search Movie Title"
                      required
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-secondary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col>
            <h3>Todays Top Picks</h3>
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
