import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login/Login";
import Register from "../views/Login/Register";
import LayoutAuth from "../components/layout/LayoutAuth";
import HomePageAuth from "../views/Home/HomePageAuth";

export const router = createBrowserRouter([
  {
    element: <LayoutAuth />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
  { path: "/", element: <HomePageAuth /> },
  { path: "/*", element: <HomePageAuth /> },
]);
