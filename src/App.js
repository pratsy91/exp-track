import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./pages/Authentication";
import PasswordReset from "./pages/forgetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Authentication /> },
      { path: "home", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "forget-password", element: <PasswordReset /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
