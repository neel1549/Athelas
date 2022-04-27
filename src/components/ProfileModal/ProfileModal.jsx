import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import axios from "axios";

const ProfileModal = ({ show, setShow, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileUser, setProfileUser] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(user);
  useEffect(() => {
    axios
      .get("http://localhost:5000/me", {
        withCredentials: true,
      })
      .then((response) => {
        setProfileUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Modal
        // style={{ width: "18rem" }}
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Body>
          <Card style={{}}>
            <img
              style={{
                borderRadius: "20px",
                height: 200,
                width: 200,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src="https://picsum.photos/500"
            />
            <Card.Body>
              <Card.Title>{profileUser.email}</Card.Title>
              <Card.Text>
                {profileUser.email} has uploaded photos in the gallery
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfileModal;
