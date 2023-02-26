import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import ReactSwitch from "react-switch";
import Header from "../components/Header";
import { themeActions } from "../store/themeSlice";

const Root = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const loadedExpenses = useSelector((state) => state.expenseReducer.expenses);
  const premium = useSelector((state) => state.premiumReducer.isPremium);
  const token = useRouteLoaderData("token");
  const dispatch = useDispatch();

  const themeHandler = () => {
    dispatch(themeActions.setTheme());
  };
  return (
    <React.Fragment>
      <Header />
      {premium && token && (
        <Container className="mt-3 offset-10">
          {theme ? (
            <h6 className={theme ? "text-white" : ""}>Dark Theme</h6>
          ) : (
            <h6 className={theme ? "text-white" : ""}>Light Theme</h6>
          )}
          <ReactSwitch onChange={themeHandler} checked={theme} />
        </Container>
      )}

      <Outlet />
    </React.Fragment>
  );
};

export default Root;
