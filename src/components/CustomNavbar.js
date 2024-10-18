// src/components/CustomNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './Assets/logooo.png';
import './CustomStyles.css';

function CustomNavbar({ cartCount, wishlistCount }) {
    return (
        <Navbar expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand to="/" className="navbar-logo">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                    {' '}HomeHaven
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        <Nav.Link as={Link} to="/products">Product List</Nav.Link> {/* Added link to Product List */}

                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/search"><i className="bi bi-search"></i></Nav.Link>
                        <Nav.Link as={Link} to="/wishlist"><i className="bi bi-heart"></i> {wishlistCount}</Nav.Link>
                        <Nav.Link as={Link} to="/cart"><i className="bi bi-cart"></i> {cartCount}</Nav.Link>
                        <Nav.Link as={Link} to="/signup">
                            <i className="bi bi-person"></i>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;