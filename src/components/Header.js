import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logOut();
    navigate("/");
  };
  return (
    <React.Fragment>
      <Navbar bg="white" variant="light">
        <Navbar.Brand className="ms-5">My Expense Tracker</Navbar.Brand>
        <Nav>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-decoration-none text-blue"
                : "text-decoration-none text-black"
            }
          >
            Home
          </NavLink>
        </Nav>
        {authCtx.isLoggedin && (
          <Button className="ms-auto me-5" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
