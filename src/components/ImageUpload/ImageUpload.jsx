import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ImageUpload = ({
  setImageUrl,
  setSpinner,
  user,
  setUser,
  setRefresh,
}) => {
  console.log("User: " + user);
  const [uploadInput, setUploadInput] = useState();
  const [image, setImage] = useState();
  const uploadImage = (e) => {
    setImageUrl("");
    e.preventDefault();
    setSpinner(true);
    let formData = new FormData();
    formData.append("file", image);
    axios
      .post("http://localhost:5000/upload-image", formData, {
        withCredentials: true,
      })
      .then((response) => {
        setSpinner(false);
        if (!user) {
          setImageUrl("http://localhost:5000/get-image/" + image.name);
        } else {
          console.log("refresh bruh?");
          setRefresh(Math.floor(Math.random() * 100));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("imageupload");
  return (
    <Card style={{ width: "25rem", opacity: 0.95, borderRadius: "15px" }}>
      <Card.Body>
        <Card.Title>
          {!user
            ? "Login to see all your saved photos"
            : "Scroll through your gallery"}
        </Card.Title>
        {user
          ? "If logged in, upload an image, and it should show in the gallery!"
          : "If not logged in, the image should show below"}
        <Card.Text>
          <Form onSubmit={uploadImage} id="comments">
            <Form.Group classname="mb-3">
              <Form.Control
                accept="image/*"
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Form.Group>
            <Form.Group classname="mb-3" style={{ marginTop: 10 }}>
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageUpload;
