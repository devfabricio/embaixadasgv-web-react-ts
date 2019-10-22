import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import ReactGA from "react-ga";

const initializeReactGA = () => {
    ReactGA.initialize('UA-150680516-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const LandingHeader = () => {

    initializeReactGA();

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