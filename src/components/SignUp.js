import React, { useContext, useRef } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
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
            authCtx.logIn(token);
            navigate("/home");
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
      <Card className="w-25 mx-auto mb-5" style={{ marginTop: "120px" }}>
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

          <Button type="submit"> {isLogin ? "Login" : "Sign Up"}</Button>
        </Form>
      </Card>
      <div className="text-center">
        <h5 className="bg-success d-inline p-3 rounded text-white">
          {isLogin ? "Don't have an Account?" : " Already have an Account"}
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-decoration-none text-dark ms-2"
          >
            {!isLogin ? "Login" : "Sign Up"}
          </Link>
        </h5>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
