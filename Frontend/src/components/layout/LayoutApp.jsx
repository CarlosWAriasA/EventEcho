import NavbarApp from "../NavBar/NavBarApp";
import { Outlet } from "react-router-dom";

const LayoutApp = () => {
  return (
    <>
      <NavbarApp />
      <main className="w-full" style={{ marginTop: "45px", height: "93.9vh" }}>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutApp;
