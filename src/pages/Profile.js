import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const nameRef = useRef();
  const urlRef = useRef();
  const [name, setName] = useState("");

  const getDetails = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return;
    }

    setName(data.users[0].displayName);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const inputName = nameRef.current.value;
    const inputUrl = urlRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: inputName,
          photoUrl: inputUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json((data) => {
          authCtx.logIn(data.idToken);
          navigate("/");
        });
      } else {
        res.json((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  const cancelHandler = () => {
    navigate("/home");
  };
  return (
    <Container style={{ marginTop: "80px" }}>
      <h1 className="mb-5">Update Your Details</h1>
      <Card bg="light">
        <h4 className="mt-3 ms-3">Last updated Name : {name}</h4>
        <Button
          className="mt-5 ms-auto me-5"
          variant="danger"
          onClick={cancelHandler}
        >
          Cancel
        </Button>
        <Form className="mt-5 p-3" onSubmit={submitHandler}>
          <Row>
            <Col lg={6}>
              <Form.Group as={Row}>
                <Col lg={3}>
                  <Form.Label>Display Name:</Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control type="text" ref={nameRef} />
                </Col>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row}>
                <Col lg={3}>
                  <Form.Label>Profile Photo Url:</Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control type="url" ref={urlRef} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Container>
            <Button className="mt-5" type="submit">
              Update
            </Button>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
