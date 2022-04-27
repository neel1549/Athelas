import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGalleryMount = ({ user }) => {
  console.log(user);
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-user-images", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setImages(
          response.data.data.map((url) => {
            return {
              original: url,
              thumbnail: url,
              originalHeight: "300px",
              originalWidth: "300px",
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  console.log(images);

  return (
    <div style={{ zIndex: -1, marginTop: "40px" }}>
      <ImageGallery
        fullscreen={true}
        thumbnailWidth="300px"
        style={{}}
        items={images}
      />
    </div>
  );
};

export default ImageGalleryMount;
