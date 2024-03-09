import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";
import HomePage from "../views/Home/HomePage";
import EventDetail from "../views/Events/EventDetail";
import AccountSettings from "../views/Account/AccountSettings";
import EventEdit from "../views/Events/EventEdit";

export const router = createBrowserRouter([
  {
    element: <LayoutApp />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/event-detail", element: <EventDetail /> },
      { path: "/account-settings", element: <AccountSettings /> },
      { path: "/event-edit", element: <EventEdit /> },
      { path: "/", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);
