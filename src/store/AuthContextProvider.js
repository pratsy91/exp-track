import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const AuthContextValue = {
    token: token,
    isLoggedin: userLoggedIn,
    logIn: loginHandler,
    logOut: logoutHandler,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
