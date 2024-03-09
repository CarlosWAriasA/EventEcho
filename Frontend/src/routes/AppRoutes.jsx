import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";
import HomePage from "../views/Home/HomePage";
import EventDetail from "../views/Events/EventDetail";
import AccountSettings from "../views/Account/AccountSettings";

export const router = createBrowserRouter([
  {
    element: <LayoutApp />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/", element: <HomePage /> },
      { path: "/event-detail", element: <EventDetail /> },
      { path: "/account-settings", element: <AccountSettings /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);
