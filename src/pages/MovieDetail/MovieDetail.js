import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarNoSearch from "../../components/NavbarNoSearch/NavbarNoSearch";
import UserService from "../../utils/userService";
import MovieService from "../../utils/movieService";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { showToast } from "../../utils/tools";
import { Link } from "react-router-dom";
//===================================================

const MovieDetails = ({ user, handleLogout }) => {
  const [movie, setMovie] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [alreadyWatched, setAlreadyWatched] = useState(false);

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";
  const { id } = useParams();

  //==============================================================================
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetail = await MovieService.getMovieDetails(id);
      setLoading(false);
      setMovie(movieDetail);
    };
    fetchMovieDetails();

    const getUserProfile = async () => {
      const profile = await UserService.getProfile();
      if (profile.data.watchlistMovies.find((w) => w.movieId === id)) {
        setAlreadyWatched(true);
      }
      setProfileLoading(false);
      setUserProfile(profile);
    };
    getUserProfile();
  }, []);

  //================================================================================
  const handleAddToWatchlist = (movie) => {
    return (e) => {
      e.preventDefault();
      addToWatchlist(movie);
      showToast("SUCCESS", "Movie added to your watchlist!");
      setAlreadyWatched(true);
    };
  };
  //============================================================================

  async function addToWatchlist(movie) {
    const movieInfo = {
      movieId: movie.id,
      movieTitle: movie.title,
      movieImg: `${TMDBImgUrl}${movie.poster_path}`,
    };
    try {
      const response = await MovieService.addToWatchlist(movieInfo);
    } catch (err) {
      console.log(err, " err from server");
    }
  }

  //=================================================================================

  if (loading) {
    return (
      <>
        <NavbarNoSearch handleLogout={handleLogout} user={user} />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <NavbarNoSearch handleLogout={handleLogout} user={user} />
      <Container>
        <br/>
        <Row>
          <Col className="img-column">
            <img
              className="detailsImg"
              src={TMDBImgUrl + movie.poster_path}
              alt={movie.title}
            ></img>
          </Col>
          <Col className="info-column">
            <ul>
              <li className="movieInfo">
                <span className="movieInfoTitles">TITLE: </span>
                {movie.title}
              </li>
              <br />
              <li className="movieInfo">
                <span className="movieInfoTitles">OVERVIEW: </span>
                {movie.overview}
              </li>
              <br />
              <li className="movieInfo">
                <span className="movieInfoTitles">RELEASE DATE: </span>
                {movie.release_date}
              </li>
              <br />
              {user && alreadyWatched && (
                <Button
                  disabled={alreadyWatched}
                  onClick={handleAddToWatchlist(movie)}
                  variant="danger"
                >
                  Added to your watch list!
                </Button>
              )}
              {user && !alreadyWatched && (
                <Button
                  disabled={alreadyWatched}
                  onClick={handleAddToWatchlist(movie)}
                  variant="success"
                >
                  Add to your watch list
                </Button>
              )}
              {!user && (
                <p className="login-to-add">
                  <span>
                    <Link to="/login">Login</Link>
                  </span>{" "}
                  to add this movie to your watchlist!
                </p>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetails;
