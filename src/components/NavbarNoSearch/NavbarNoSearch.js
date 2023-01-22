import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import "./NavbarNoSearch.css";
//=========================================================

const HeaderNoSearch = ({ user, handleLogout, handleSearch }) => {

  useEffect(() => {
    console.log("re-render");
    //console.log("SearchText", searchText)
  }, []);

  if (user) {
    return (
      <>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          bg="black"
          variant="dark"
        >
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="logoFont" href="#home">
                <img
                  alt=""
                  src="https://i.imgur.com/eNExTFg.png"
                  width="60"
                  height="60"
                  className="d-inline-block"
                />{" "}
                <span className="moovie">Moovie</span>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              </Nav>

              <Nav>
                <LinkContainer to={`/${user.username}`}>
                  <Nav.Link className="navLinks">
                    {user.username}'s Watchlist
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/" onClick={handleLogout}>
                  <Nav.Link className="navLinks">Log Out</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="black"
        variant="dark"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logoFont" href="#home">
              <img
                alt=""
                src="https://i.imgur.com/eNExTFg.png"
                width="60"
                height="60"
                className="d-inline-block"
              />{" "}
              <span className="moovie">Moovie</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              
            </Nav>
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link className="navLinks">Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link className="navLinks">Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderNoSearch;