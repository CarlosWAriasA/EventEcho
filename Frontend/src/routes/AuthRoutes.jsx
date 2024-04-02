import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login/Login";
import Register from "../views/Login/Register";
import LayoutAuth from "../components/layout/LayoutAuth";

export const router = createBrowserRouter([
  {
    element: <LayoutAuth />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/*", element: <Login /> },
    ],
  },
]);
