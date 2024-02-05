import { React, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { useToast } from "@chakra-ui/toast";
import jwtDecode from "jwt-decode";

function HomeBody() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Chakra UI toast for displaying success and error messages
  const toast = useToast();

  // Function to display success toast
  const successToast = () => {
    toast({
      title: `Login successful`,
      position: "top",
      isClosable: true,
    });
  };

  // Function to display error toast
  const errorToast = () => {
    toast({
      title: `Wrong username or password`,
      status: "error",
      position: "top",
      isClosable: true,
    });
  };

  // Event handlers for input changes
  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // React Router hook for navigation
  const navigate = useNavigate();

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const oldPerson = {
      username: userName,
      password: password,
    };

    // Fetch data from the server
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(oldPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if the user is authenticated
        if (data.user) {
          // Store the authentication token in local storage
          localStorage.setItem("token", data.user);

          // Display success toast
          successToast();

          // Redirect to the feed page after a delay
          setTimeout(() => {
            window.location.href = "/feed";
          }, 600);
        } else {
          // Display error toast for wrong username or password
          errorToast();
        }
      })
      .then(setUserName(""))
      .then(setPassword(""));
  };

  // useEffect hook to check if the user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      // Check if the token is still valid
      if (user.exp <= Date.now() / 1000) {
        localStorage.removeItem("token");
      } else {
        // Redirect to the feed page if the user is authenticated
        navigate("/feed");
      }
    }
  }, []);

  return (
    <div className="container">
      <div className="homeContainer">
        <div className="homeContainer-logo">
          <BsTwitter />
        </div>
        <br></br>
        <div className="homeContainer-header">
          <h2>Sign in to Twitter</h2>
        </div>

        <a className="googleSignIn" href="#">
          <FcGoogle style={{ fontSize: "1.3rem" }} />
          <div> Sign in with Google</div>
        </a>
        <div className="homeContainer-hr">
          <hr></hr>
          <span>or</span>
          <hr></hr>
        </div>

        <form
          className="homeContainer-form"
          action="http://localhost:5000/signup"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            required
            className="homeContainer-input"
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={handleChangeUserName}
          ></input>
          <br></br>
          <input
            required
            className="homeContainer-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <br></br>
          <button className="homeContainer-btn" type="submit">
            Sign in
          </button>
        </form>
        <div className="homeContainer-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;
