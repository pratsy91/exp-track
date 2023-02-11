import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const emailRef = useRef();
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const inputEmail = emailRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: inputEmail,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Check your Email");
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      <Card className="w-25 mx-auto" style={{ marginTop: "100px" }}>
        <Form onSubmit={submitHandler} className="p-3">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" ref={emailRef} className="mb-3" />
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="danger"
            type="button"
            className="ms-3"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default PasswordReset;
