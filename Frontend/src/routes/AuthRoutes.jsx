import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login/Login";
import Register from "../views/Login/Register";
import LayoutAuth from "../components/layout/LayoutAuth";
import HomePage from "../views/Home/HomePage";
import ResetPassword from "../views/Login/ResetPassword";

export const router = createBrowserRouter([
  {
    element: <LayoutAuth />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/reset-password/:Token", element: <ResetPassword /> },
      { path: "/", element: <HomePage /> },
      { path: "/*", element: <HomePage /> },
    ],
  },
]);
