import { createBrowserRouter } from "react-router-dom";
import HomePage from "./views/Home/HomePage";
import Login from "./views/Login/Login";
import Register from "./views/Login/Register";
import LayoutApp from "./components/layout/LayoutApp";
import LayoutAuth from "./components/layout/LayoutAuth";
import EventDetail from "./views/Events/EventDetail";
import AccountSettings from "./views/Account/AccountSettings";

export const router = createBrowserRouter([
  {
    element: <LayoutApp />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "event-detail",
        element: <EventDetail />,
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
      },
    ],
  },
  {
    element: <LayoutAuth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
