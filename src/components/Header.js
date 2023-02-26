import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeReducer.theme);
  const token = useRouteLoaderData("token");

  const loginHandler = () => {
    navigate("/auth?mode=login");
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/auth?mode=login");
  };
  return (
    <React.Fragment>
      <Navbar
        style={
          theme
            ? { backgroundColor: "#350241" }
            : { backgroundColor: "#af05d9" }
        }
      >
        <Navbar.Brand className="ms-5 bg- p-2 rounded text-warning">
          My Expense Tracker
        </Navbar.Brand>
        {token && (
          <Nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none text-info me-3"
                  : "text-decoration-none text-white me-3"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none text-info me-3"
                  : "text-decoration-none text-white me-3"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                isActive
                  ? "text-decoration-none text-info"
                  : "text-decoration-none text-white"
              }
            >
              Expenses
            </NavLink>
          </Nav>
        )}
        {!token && (
          <Button
            className="ms-auto me-5"
            onClick={loginHandler}
            variant={theme ? "info" : "dark"}
          >
            Login
          </Button>
        )}
        {token && (
          <Button
            className="ms-auto me-5"
            onClick={logoutHandler}
            variant={theme ? "info" : "dark"}
          >
            Logout
          </Button>
        )}
      </Navbar>
    </React.Fragment>
  );
};

export default Header;
