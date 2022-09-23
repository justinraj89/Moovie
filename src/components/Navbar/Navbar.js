import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <>
        
        <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="https://i.imgur.com/VTrwaJv.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Movie
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features">About</Nav.Link>
                    <NavDropdown title="Movies" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Login</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                    Sign Up
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Container>
        </Navbar>
      </>
    )
}


export default Header;