import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import MovieService from "../../utils/movieService";
import Movie from "../../components/Movie/Movie";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
//==============================================================

function Home({ user, handleLogout }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
//----------------------------------------------
  const loadMoreMovies = () => {
    setCurrentPage((page) => page + 1);
  };
  //----------------------------------------------
  const fetchTrendingMovies = async () => {
    let movies = await MovieService.fetchTrendingMovies(currentPage);
    setLoading(() => false);
    setMovies((prev) =>
      currentPage === 1 ? movies.results : [...prev, ...movies.results]
    );
  };
  //----------------------------------------------------------
  const fetchSearchMovies = async (query) => {
    const queryMovies = await MovieService.movieSearch(query, currentPage);
    setMovies((prev) =>
      currentPage === 1
        ? queryMovies.results
        : [...prev, ...queryMovies.results]
    );
  };
  //---------------------------------------
  const handleSearch = (criteria) => {
    console.log("SEARCH CRITERIA",criteria)
    if (criteria) {
      setSearch(criteria);
      fetchSearchMovies(criteria);
      setCurrentPage(1);
      }
  };
  //---------------------------------------

  useEffect(() => {
    search === '' ? fetchTrendingMovies() : fetchSearchMovies(search);
  }, [currentPage, search]);

  //--------------------------------
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
        <Navbar handleSearch={handleSearch} handleLogout={handleLogout} user={user} />
        <LoadingSpinner />
      </>
    );
  }

  //------------------------------------------------------

  return (
    <>
      <Navbar
        handleLogout={handleLogout}
        user={user}        
        handleSearch={handleSearch}
        search={search}
      />
      <Container>
        <Row>
          <Col>
            <div className="movie-container">
              {movies.length > 0 &&
                movies.map((movie) => <Movie key={movie.id} {...movie} />)}
                {movies.length === 0 && <div>No movies found. Please try again.</div>}
            </div>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    </>
  );
}

export default Home;
