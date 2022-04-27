import React, { useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import LoginModal from "./components/LoginModal/LoginModal";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ImageGalleryMount from "./components/ImageGallery/ImageGalleryMount";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [register, setRegister] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [refresh, setRefresh] = useState(0);
  console.log("refresh");
  const formData = new FormData();
  formData.append("email", "neel@cmu.com");
  formData.append("password", "12345");

  function logout() {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <NavBar
        setShow={setShowLogin}
        setRegister={setRegister}
        setUser={(value) => setUserAuthenticated(value)}
        user={userAuthenticated}
        logout={logout}
        setProfile={setShowProfile}
      />

      <div
        class="p-5 text-center bg-image rounded-3"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BhY2UlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80')",
          height: "100%",
          /* Center and scale the image nicely */
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          opacity: 0.9,
        }}
      >
        <div style={{ display: "inline-block" }}>
          <ImageUpload
            setImageUrl={(value) => setImageUrl(value)}
            setSpinner={(value) => setSpinner(value)}
            user={userAuthenticated}
            setUser={(value) => setUserAuthenticated(value)}
            setRefresh={(value) => setRefresh(value)}
          />
          {spinner === true && <Spinner animation="border" />}
          {imageUrl && (
            <Card
              style={{ marginTop: "20px", opacity: 0.95, borderRadius: "15px" }}
            >
              <img
                style={{ zIndex: -1, width: "200px", marginTop: "5px" }}
                alt=""
                src={imageUrl}
              />
            </Card>
          )}
        </div>

        <LoginModal
          show={showLogin}
          setShow={setShowLogin}
          register={register}
          setUser={setUserAuthenticated}
        />
        <ProfileModal
          show={showProfile}
          setShow={setShowProfile}
          user={userAuthenticated}
        />
        {userAuthenticated && (
          <ImageGalleryMount key={refresh} user={userAuthenticated} />
        )}
      </div>
    </>
  );
}

export default App;
