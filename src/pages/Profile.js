import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const nameRef = useRef();
  const urlRef = useRef();
  const [name, setName] = useState([]);
  const [time, setTime] = useState([]);
  const [photo, setPhoto] = useState([]);

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
    console.log(data);
    const date = new Date(data.users[0].passwordUpdatedAt).toLocaleDateString();
    setTime(date);
    setName(data.users[0].displayName);
    setPhoto(data.users[0].photoUrl);
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
        navigate("/home");
        res.json((data) => {
          authCtx.logIn(data.idToken);
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
      <Card bg="light" className="mb-5">
        <Button
          className="mt-4 ms-auto me-5"
          variant="danger"
          onClick={cancelHandler}
        >
          Cancel
        </Button>

        <div>
          <span>
            <h5 className="mt-1 ms-3">Last updated Name : {name}</h5>
          </span>
          <span>
            <h5 className="mt-1 ms-3">
              Last updated Photo :
              <img src={photo} alt="pic" style={{ width: "100px" }} />
            </h5>
          </span>
        </div>
        <h5 className="ms-auto me-3 mb-5 ">Last updated on : {time}</h5>

        <Form className="mt-2 p-3" onSubmit={submitHandler}>
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
