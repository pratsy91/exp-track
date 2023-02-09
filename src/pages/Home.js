import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import AuthContext from "../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!response.ok) {
      setLoading(true);
    }
    setLoading(false);
    setName(data.users[0].displayName);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Row style={{ marginTop: "150px" }}>
      <Col>
        <h1 className="ms-5 mb-3">Welcome to Expense Tracker</h1>
        {loading ? (
          "loading..."
        ) : (
          <h4 className="ms-5">
            {name ? "View Profile" : "Your Profile is incomplete."}
            <Link className="text-decoration-none ms-3" to="/profile">
              {name ? "Click here" : "Complete now"}
            </Link>
          </h4>
        )}
      </Col>
    </Row>
  );
};

export default Home;
