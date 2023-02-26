import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Expenses from "./pages/expenses";
import PasswordReset from "./pages/forgetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import { getExpense, tokenLoader } from "./store/Requests";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "token",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "/auth", element: <Authentication /> },
      { path: "expenses", element: <Expenses /> },
      { path: "profile", element: <Profile /> },
      { path: "forget-password", element: <PasswordReset /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const theme = useSelector((state) => state.themeReducer.theme);
  return (
    <div className={theme ? "dark" : "light"}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
