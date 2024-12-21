import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from "./Login";
const Navbarpanel = () => {

    const products = useSelector(state => state.card)

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Redux Toolkit</Navbar.Brand>
                <Nav>
                    <Nav.Link to="/" as={Link}>Products</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        <Nav.Link to="/card" as={Link}>My Bag {products.reduce((acc, product) => acc + product.count, 0)} </Nav.Link>
                    </Navbar.Text>&nbsp;&nbsp;&nbsp;
                    <Navbar.Text>
                        <Nav.Link to="/Login" as={Link}>Login</Nav.Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarpanel;