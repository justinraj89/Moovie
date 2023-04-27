import React, { useState, useEffect, useCallback } from "react";
import "./ProfilePage.css";
import MovieService from "../../utils/movieService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarNoSearch from "../../components/NavbarNoSearch/NavbarNoSearch";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import WatchlistMovie from "../../components/WatchlistMovie/WatchlistMovie";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";
import RemoveFromWathlistModal from "../../components/RemoveFromWatchlistModal/RemoveFromWathlistModal";
//================================================================

export default function ProfilePage({ user, handleLogout }) {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState(null);

  const { username } = useParams();

  //=============================================================

  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setLoading(false);
      setProfileUser(response.data.user);
      setWatchlistMovies(response.data.watchlistMovies);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  //===============================================================

  const removeFromWatchlist = async (movie) => {
    try {
      const response = await MovieService.removeMovieFromWatchlist(movie);
      setWatchlistMovies(
        watchlistMovies.filter((m) => m.movieId !== movie.movieId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  //==================================================================

  const handleRemoveFromWatchlist = (movie) => {
    return (e) => {
      e.preventDefault();
      setShowModal(true);
      setMovieToRemove(movie);
    };
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMovieToRemove(null);
  };

  const handleConfirmRemove = () => {
    removeFromWatchlist(movieToRemove);
    handleCloseModal();
  };

  //============================================

  useEffect(() => {
    getProfile();
  }, [username]);

  //========================================

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
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <h1 className="username">{profileUser.username}'s Watchlist </h1>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <div className="movie-container">
              {watchlistMovies.length === 0 ? (
                <div className="no-movies">No Movies in Watchlist</div>
              ) : (
                watchlistMovies.length > 0 &&
                watchlistMovies.map((movie) => (
                  <WatchlistMovie
                    key={movie.movieId}
                    {...movie}
                    handleRemoveFromWatchlist={handleRemoveFromWatchlist(movie)}
                  />
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <RemoveFromWathlistModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleConfirmRemove={handleConfirmRemove}
        movieToRemove={movieToRemove}
      />
    </>
  );
}
