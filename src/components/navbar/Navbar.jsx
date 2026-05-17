import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css' 

function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">074Diversao</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/carrinho">Carrinho</Nav.Link>
            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>  {/* ← rota errada antes */}
          </Nav>
          <Button variant="outline-light" as={Link} to="/login">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent