import React, { useState, useEffect, useCallback } from "react";
import "./ProfilePage.css";
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
  const [loading, setLoading] = useState(true)

  const { username } = useParams();

  //=============================================================

  // useEffect(() => {
  //   async function getProfile() {
  //     try {
  //       const data = await userService.getProfile(username);
  //       console.log(data, "<---DATA");
  //       setProfileUser(() => data.user);
  //       // setWatchlistMovies(() => [...data.watchlistMovies])
  //       setWatchlistMovies(() => data.watchlistMovies)
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getProfile();
  // }, [username]);



  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username); 
      console.log(response)
      setLoading(false);
      setProfileUser(response.data.user);
      setWatchlistMovies(response.data.watchlistMovies)

    } catch (err) {
      console.log(err.message);
    }
  }, [username]);

  //===============================================================

  useEffect(() => {
    getProfile();
  }, [username, getProfile]);


  // useEffect(() => {
  //   async function getProfile() {
  //     try {
  //       const data = await userService.getProfile(username);
  //       console.log(data.data, "<---DATA");
  //       setWatchlistMovies(() => [...data.data.watchlistMovies])
  //       console.log(watchlistMovies, '<--WATCHLIST MOVIES')
  //       setProfileUser(data.data.user);
  //       console.log(profileUser, "<--profile user");
  //       // setWatchlistMovies(() => [...data.watchlistMovies])

        
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getProfile();
  // }, [username]);

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} />
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <br />
            <br />
            <h1 className="username">Hello {profileUser.username} </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="movie-container">
              {watchlistMovies.length > 0 &&
                watchlistMovies.map((movie) => <WatchlistMovie key={movie.movieId} {...movie} />)}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
