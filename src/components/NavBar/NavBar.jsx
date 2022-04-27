import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavBar = ({ setShow, setRegister, user, setUser, logout }) => {
  console.log(user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Athelas Image Upload</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {!user ? (
            <Nav>
              <Nav.Link
                onClick={() => {
                  setShow(true);
                  setRegister(false);
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setShow(true);
                  setRegister(true);
                }}
              >
                Register
              </Nav.Link>
            </Nav>
          ) : (
            <Nav.Link
              onClick={() => {
                logout();
                console.log("hllo");
                setUser(false);
              }}
            >
              Logout
            </Nav.Link>
          )}
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
