import React, { useEffect } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, verificationRequest } from "../store/Requests";
import imageurl from "../images/tracker.png";
import { userActions } from "../store/userDetailsilce";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer.theme);
  const token = useRouteLoaderData("token");
  const user = useSelector((state) => state.userReducer.user);
  const verificationSent = useSelector((state) => state.userReducer.emailsent);
  const emailVerified = user.emailVerified;
  const name = user.displayName;

  if (emailVerified) {
    dispatch(userActions.emailSent({ flag: false }));
  }

  const emailHandler = () => {
    dispatch(verificationRequest(token));
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row style={{ marginTop: "100px" }}>
        <Container className="offset-1 mb-4">
          <img src={imageurl} alt="mail" width="150px" />
        </Container>
        <h1 className={theme ? "ms-5 mb-3 text-white" : "ms-5 mb-3 text-dark"}>
          Welcome to Expense Tracker
        </h1>

        <Col>
          {token && (
            <h4 className={theme ? "ms-5 text-white" : "ms-5 text-dark"}>
              {name ? "View Profile" : "Your Profile is incomplete."}
              <Link className="text-decoration-none ms-3" to="/profile">
                {name ? "Click here" : "Complete now"}
              </Link>
            </h4>
          )}
        </Col>
      </Row>
      {verificationSent && (
        <h3
          className={
            theme ? "offset-6 mb-3 text-info" : "offset-6 mb-3 text-danger"
          }
        >
          Email sent, Check your mail for verification.
        </h3>
      )}
      {token && (
        <Card className="w-25 offset-7" bg={theme ? "dark" : "light"}>
          <Button
            variant={emailVerified ? "warning" : "danger"}
            className=" m-5"
            onClick={emailHandler}
            disabled={emailVerified}
          >
            {emailVerified ? "Your Email is Verified" : "Verify Your Email"}
          </Button>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Home;
