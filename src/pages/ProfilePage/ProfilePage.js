import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import Movie from "../../components/Movie/Movie";

export default function ProfilePage() {
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
