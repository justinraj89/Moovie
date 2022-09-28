import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import MovieService from "../../utils/movieService";
import Movie from "../../components/Movie/Movie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Home({ user, handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //==========================================

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await MovieService.fetchTrendingMovies();
      // console.log(movies, "<-- from fetch trending movies");
      setLoading(() => false);
      setMovies(movies.results);
    };
    fetchTrendingMovies();
  }, []);

  //===================================================

  const fetchSearchMovies = async (query) => {
    const queryMovies = await MovieService.movieSearch(query);
    console.log(queryMovies)
    setMovies(queryMovies.results)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchSearchMovies(search)
      setSearch("");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  //================================================

  if (loading) {
    return (
      <>
        <Navbar handleLogout={handleLogout} user={user} />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Navbar handleLogout= {handleLogout} user={user}/>
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <Carousel movies={movies}/>
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
