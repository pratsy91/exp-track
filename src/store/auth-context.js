import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedin: false,
  logIn: (token) => {},
  logOut: () => {},
});

export default AuthContext;
