import React, { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
const Signup = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
      setAlertMessage("password and confrim password is not same");
      return;
    }
    let url = isSignIn
      ? "http://localhost:3000/user/log-in"
      : "http://localhost:3000/user/sign-up";
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
      localStorage.setItem("token", data.token);
      console.log("data from backend", data);
    } catch (err) {
      console.log("Can not get data from backend", err);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (!isSignIn) confirmPasswordRef.current.value = "";
  };

  const onClickHandler = () => {
    setIsSignIn((isSignIn) => !isSignIn);
  };
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      {show && (
        <Alert show={show} variant="success">
          <Alert.Heading>My Alert</Alert.Heading>
          <p>{alertMessage}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close me
            </Button>
          </div>
        </Alert>
      )}
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{isSignIn ? "SignIn" : "SignUp"}</Card.Title>
          <form onSubmit={onSubmitHanlder}>
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="text" placeholder="password" ref={passwordRef} />
            {isSignIn ? (
              " "
            ) : (
              <input
                type="text"
                placeholder="confirm password"
                ref={confirmPasswordRef}
              />
            )}
            <Button type="submit" variant="primary">
              {isSignIn ? "SignIn" : "SignUp"}
            </Button>
          </form>
        </Card.Body>
      </Card>
      <div>
        {isSignIn ? "Dont't have account" : "Already have account?"}{" "}
        <Button variant="link" onClick={onClickHandler}>
          {isSignIn ? "SignUp" : "SignIn"}
        </Button>
      </div>
    </div>
  );
};

export default Signup;
