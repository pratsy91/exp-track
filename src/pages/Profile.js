import React, { useEffect, useRef } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "../store/Requests";

const Profile = () => {
  const token = useRouteLoaderData("token");
  const theme = useSelector((state) => state.themeReducer.theme);
  const user = useSelector((state) => state.userReducer.user);
  console.log("🚀 ~ file: Profile.js:17 ~ Profile ~ user:", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const urlRef = useRef();
  const time = new Date(user.passwordUpdatedAt).toLocaleDateString();
  const name = user.displayName;
  const photo = user.photoUrl;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    const inputName = nameRef.current.value;
    const inputUrl = urlRef.current.value;
    dispatch(updateUserDetails(inputName, inputUrl, token));
  };

  const cancelHandler = () => {
    navigate("/");
  };
  return (
    <Container style={{ marginTop: "80px" }}>
      <h1 className={theme ? "mb-5 text-white" : "mb-5 text-dark"}>
        Update Your Details
      </h1>
      <Card bg={theme ? "dark" : "light"} className="mb-5">
        <Button
          className="mt-4 ms-auto me-5"
          variant="danger"
          onClick={cancelHandler}
        >
          Cancel
        </Button>

        <div>
          <span>
            <h5 className={theme ? "mt-1 ms-3 text-white" : "mt-1 ms-3"}>
              Last updated Name : {name ? name : "update your name"}
            </h5>
          </span>
          <span>
            <h5 className={theme ? "mt-1 ms-3 text-white" : "mt-1 ms-3"}>
              Last updated Photo :
              {photo ? (
                <img
                  src={photo}
                  alt="pic"
                  style={{ width: "100px" }}
                  className="img-thumbnail"
                />
              ) : (
                "update your display picture"
              )}
            </h5>
          </span>
        </div>
        <h5
          className={
            theme ? "ms-auto me-3 mb-5 text-white" : "ms-auto me-3 mb-5 "
          }
        >
          Last updated on : {time ? time : ""}
        </h5>

        <Form className="mt-2 p-3" onSubmit={submitHandler}>
          <Row>
            <Col lg={6}>
              <Form.Group as={Row}>
                <Col lg={3}>
                  <Form.Label className={theme ? "text-white" : ""}>
                    Display Name:
                  </Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control type="text" ref={nameRef} />
                </Col>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row}>
                <Col lg={3}>
                  <Form.Label className={theme ? "text-white" : ""}>
                    Profile Photo Url:
                  </Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control type="url" ref={urlRef} />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Container>
            <Button
              className="mt-5"
              type="submit"
              variant={theme ? "info" : "dark"}
            >
              Update
            </Button>
          </Container>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
