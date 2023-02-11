import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [emailVerified, setEmailverified] = useState(false);

  const emailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDJ9KIngXop8piNyJh98dkNzwLknIZGJ30",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Check your email");
          authCtx.logOut();
          navigate("/");
        }
      })
      .catch((err) => {
        alert("Try again Later");
      });
  };

  const getDetails = async () => {
    setLoading(true);
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
    console.log(data);

    setLoading(false);
    setError(false);
    const currName = data.users[0].displayName;
    setName(currName);
    setEmailverified(data.users[0].emailVerified);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <React.Fragment>
      <Row style={{ marginTop: "150px" }}>
        <h1 className="ms-5 mb-3">Welcome to Expense Tracker</h1>

        <Col>
          {!loading && !error && (
            <h4 className="ms-5">
              {name ? "View Profile" : "Your Profile is incomplete."}
              <Link className="text-decoration-none ms-3" to="/profile">
                {name ? "Click here" : "Complete now"}
              </Link>
            </h4>
          )}
        </Col>
      </Row>
      <Card className="w-25 offset-7">
        <Button
          variant={emailVerified ? "primary" : "danger"}
          className=" m-5"
          onClick={emailHandler}
          disabled={emailVerified}
        >
          {emailVerified ? "Your Email is Verified" : "Verify Your Email"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Home;
