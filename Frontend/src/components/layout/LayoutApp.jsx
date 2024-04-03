import NavbarApp from "../NavBar/NavBarApp";
import { Outlet } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <NavbarApp />
      <main className="w-full" style={{ marginTop: "3.5rem", height: "92.8vh" }}>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutApp;
