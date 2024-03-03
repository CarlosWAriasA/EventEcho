import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";
import HomePage from "../views/Home/HomePage";
import EventDetail from "../views/Events/EventDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/", element: <HomePage /> },
      { path: "/event-detail", element: <EventDetail /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);
