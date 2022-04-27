import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const NavBar = ({
  setShow,
  setRegister,
  user,
  setUser,
  logout,
  setProfile,
}) => {
  console.log("nav bar");
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
          <Nav.Link>
            <FontAwesomeIcon icon={faUser} onClick={() => setProfile(true)} />
            <Nav />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
