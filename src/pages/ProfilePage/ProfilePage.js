import React, { useState, useEffect, useCallback } from "react";
import "./ProfilePage.css";
import MovieService from "../../utils/movieService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import WatchlistMovie from "../../components/WatchlistMovie/WatchlistMovie";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

//================================================================

export default function ProfilePage({ user, handleLogout }) {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);

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
      console.log("remove movie:",movie)
      const response = await MovieService.removeMovieFromWatchlist(movie);
      setWatchlistMovies(watchlistMovies.filter(m => m.movieId !== movie.movieId));
    } catch (err) {
      console.log(err);
    }
  };

  //==================================================================

  const handleRemoveFromWatchlist =  (movie) => {
    return (e) => {
      console.log('CLICK HAPPENING')
      e.preventDefault();
      removeFromWatchlist(movie);
      //getProfile(username)
     };
  }

  //============================================

  useEffect(() => {
    getProfile();
  }, [username]);

//========================================

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} />
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <br />
            <br />
            <h1 className="username">{profileUser.username}'s Watchlist </h1>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <div className="movie-container">
              {watchlistMovies.length > 0 &&
                watchlistMovies.map((movie) => (
                  <WatchlistMovie key={movie.movieId} {...movie} handleRemoveFromWatchlist={handleRemoveFromWatchlist(movie)} />
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
