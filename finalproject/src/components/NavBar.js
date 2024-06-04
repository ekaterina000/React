import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../styles/NavBar.css';

const NavBar = ({ search, setSearch }) => {
  return (
    <Navbar bg="purple" variant="dark" expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">Pokemons</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
        </Nav>
        <Form className="custom-form">
          <FormControl 
            type="text" 
            placeholder="Search Pokemon" 
            className="mr-sm-2" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

