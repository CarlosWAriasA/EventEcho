import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login/Login";
import Register from "../views/Login/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Login />,
  },
]);
