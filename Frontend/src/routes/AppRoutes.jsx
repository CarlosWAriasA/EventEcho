import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../components/layout/LayoutApp";
import HomePage from "../views/Home/HomePage";
import EventDetail from "../views/Events/EventDetail";
import AccountSettings from "../views/Account/AccountSettings";
import EventEdit from "../views/Events/EventEdit";
import EventAdmin from "../views/Events/EventAdmin";
import EventList from "../views/Events/EventList";

export const router = createBrowserRouter([
  {
    element: <LayoutApp />,
    children: [
      { path: "/event-detail/:Id", element: <EventDetail /> },
      { path: "/account-settings", element: <AccountSettings /> },
      { path: "/event-edit/:Id?", element: <EventEdit /> },
      { path: "/event-admin", element: <EventAdmin /> },
      { path: "/event-list", element: <EventList /> },
      { path: "/home", element: <HomePage /> },
      { path: "/", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
    ],
  },
]);
