import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import Alert from "react-bootstrap/Alert";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const onSubmitHanlder = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = !isSignIn ? confirmPasswordRef.current.value : "";

    if (!email || !password || (!isSignIn && !confirmPassword)) {
      setShow(true);
      setAlertMessage("form field can't be empty");
      return;
    }

    if (!isSignIn && password !== confirmPassword) {
      setShow(true);
      setAlertMessage("password and confirm password is not same");
      return;
    }
    let url = isSignIn
      ? "http://localhost:8000/user/log-in"
      : "http://localhost:8000/user/sign-up";
    console.log("value of url is ", url);
    try {
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setIsSignIn((isSignIn) => !isSignIn);
      }
      console.log("data from backend", data);
    } catch (err) {
      console.log("Can't singup at this time", err);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (!isSignIn) confirmPasswordRef.current.value = "";
  };

  const onClickHandler = () => {
    setIsSignIn((isSignIn) => !isSignIn);
  };
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundColor: "#E0FFFF",
      }}
    >
      {show && (
        <Alert
          severity="error"
          onClose={() => {
            setShow(false);
          }}
        >
          <p>{alertMessage}</p>
        </Alert>
      )}
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {isSignIn ? "SignIn" : "SignUp"}
          </Card.Title>
          <form onSubmit={onSubmitHanlder}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                ref={emailRef}
              />

              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                ref={passwordRef}
              />

              {!isSignIn && (
                <div>
                  <label htmlFor="confirm password">
                    {" "}
                    <b>Confirm Password</b>{" "}
                  </label>
                  <input
                    id="confirm password"
                    type="password"
                    placeholder="confirm password"
                    ref={confirmPasswordRef}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button type="submit" variant="primary">
                {isSignIn ? "SignIn" : "SignUp"}
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
      <div>
        {isSignIn ? <b>Dont't have account</b> : <b>Already have account?</b>}{" "}
        <Button
          variant="link"
          onClick={onClickHandler}
          style={{ textDecoration: "none" }}
        >
          {isSignIn ? <b>SignUp</b> : <b>SignIn</b>}
        </Button>
      </div>
    </div>
  );
};

export default Signup;
