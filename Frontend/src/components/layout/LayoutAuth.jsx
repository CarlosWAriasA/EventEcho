import NavbarAuth from "../NavBar/NavBarAuth";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const LayoutAuth = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <>
      <NavbarAuth />
      {user == null && pathname != "/login" && pathname != "/register" ? (
        <main
          className="w-full"
          style={{ marginTop: "3.5rem", height: "92.5vh" }}
        >
          <Outlet />
        </main>
      ) : (
        <main className="flex items-center h-screen">
          <Outlet />
        </main>
      )}
    </>
  );
};

export default LayoutAuth;
