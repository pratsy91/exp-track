import React, { useContext, useRef } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useSearchParams,
  Link,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";

const SignUp = () => {
  const token = useRouteLoaderData("token");
  const theme = useSelector((state) => state.themeReducer.theme);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  let url = "";
  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const emailInput = emailRef.current.value;
    const passInput = passRef.current.value;
    const confirmPass = isLogin ? "" : confirmPassRef.current.value;

    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30";
      if (passInput !== confirmPass) {
        alert("password did not match");
        emailRef.current.value = "";
        passRef.current.value = "";
        confirmPassRef.current.value = "";
        return;
      }
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        if (isLogin) {
          res.json().then((data) => {
            const token = data.idToken;
            localStorage.setItem("email", emailInput);
            localStorage.setItem("token", token);
            navigate("/");
          });
        } else {
          alert("Successfully Signed up");
          navigate("/?mode=login");
        }
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  return (
    <React.Fragment>
      <Card
        className="w-25 mx-auto mb-5"
        style={{ marginTop: "60px" }}
        bg={theme ? "dark" : "light"}
      >
        <Form className="m-5" onSubmit={submitHandler}>
          <FloatingLabel label="Enter email" className="mb-3">
            <Form.Control type="email" ref={emailRef} />
          </FloatingLabel>
          <FloatingLabel label="Enter password" className="mb-3">
            <Form.Control type="password" ref={passRef} />
          </FloatingLabel>
          {!isLogin && (
            <FloatingLabel label="Confirm password " className="mb-5">
              <Form.Control
                type="password"
                ref={confirmPassRef}
                disabled={isLogin}
              />
            </FloatingLabel>
          )}
          <Button type="submit" variant={theme ? "info" : "dark"}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>
      </Card>

      <div className="text-center">
        <div className="mb-5">
          <Link to="/forget-password">
            <Button variant="danger">Forgot Password? </Button>
          </Link>
        </div>

        <h5
          className={
            theme
              ? "bg-info d-inline p-3 rounded text-dark"
              : "bg-dark d-inline p-3 rounded text-white"
          }
        >
          {isLogin ? "Don't have an Account?" : " Already have an Account?"}
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-decoration-none text-primary ms-2"
          >
            {!isLogin ? "Login" : "Sign Up"}
          </Link>
        </h5>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
