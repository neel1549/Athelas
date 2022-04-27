import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const LoginModal = ({ show, setShow, register, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (register) {
      axios
        .post("http://localhost:5000/register", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setShow(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/login", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setShow(false);
          setUser(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{register ? "Register" : "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Login">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button variant="primary" type="submit">
                  {register ? "Register" : "Login"}
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
