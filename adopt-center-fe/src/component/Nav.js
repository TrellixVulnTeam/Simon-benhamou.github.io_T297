import React from 'react'
import {Link} from 'react-router-dom'
import { Navbar,Container,Nav } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';

export default function Navigation(props) {
    return (
    <Navbar bg="light" variant="light">
             <Container>
                    <Nav className="me-auto">
                    <Nav.Link  as={Link} className="navbar" to="/">Home</Nav.Link>
                    <Nav.Link  as={Link} className="navbar" to="/search">Search</Nav.Link>
                    <PrivateRoute auth={props.auth}>
                      <Nav.Link  as={Link} className="navbar" to="/mypets" > My Pets</Nav.Link>
                    </PrivateRoute>
                    </Nav>
            </Container>
  </Navbar>
    )
}
