import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";
import HomePage from "../views/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);
