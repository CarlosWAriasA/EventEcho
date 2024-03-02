import NavbarAuth from "../NavBar/NavBarAuth";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <>
      <NavbarAuth />
      <main className="flex items-center h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAuth;
