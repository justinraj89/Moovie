import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import Movie from "../../components/Movie/Movie";

import userService from '../../utils/userService';
import { useParams } from 'react-router-dom';


//================================================================

export default function ProfilePage() {

    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const [profileUser, setProfileUser] = useState({})

    const { username } = useParams();

    //=============================================================

    useEffect(() => {
        async function getProfile() {
            try{
                const data = await userService.getProfile(username)
                console.log( data, '<---DATA')
            }catch(err){
                console.log(err)
            }
        }
        getProfile()
    }, [])


  return (
    <>
      <Navbar />
      <br />
      <Container fluid="md">
        
        
        <Row>
          <Col>
            <div>USERS WATCHLIST WILL GO HERE</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
