import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Carousel from '../../components/Carousel/Carousel'
// import './App.css';
import TrendingMovies from '../../components/TrendingMovies/TrendingMovies'






function App() {

  const [movies, setMovies] = useState([]);


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

      <br/>
      <br/>
      <br/>

      <Row>
        <Col>
          <h2>Looking for something to Watch?</h2>
        </Col>
      </Row>
        
      <Row>
        <Col>
          <TrendingMovies />
        </Col>
      </Row>


    </Container>
    </>
  );
}

export default App;

