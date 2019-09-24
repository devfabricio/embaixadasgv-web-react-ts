import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
const LandingHeader = (props) => {

    return (
        <header>
        <div className="container">
            <div className="logo">
                <Link to={"/"}><img src="assets/images/logo.png" /></Link>
            </div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={"nav-link"} to="/sobre">Sobre as embaixadas</Link>
                        <Link className={"nav-link"} to="/lista">Lista</Link>
                        <Link className={"nav-link"} to="/quero-fundar">Quero fundar</Link>
                        <Link className={"nav-link"} to="/contato">Contato</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        </header>)
};

export default LandingHeader