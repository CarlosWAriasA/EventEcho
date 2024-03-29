import { NavLink, useLocation } from "react-router-dom";

const NavbarAuth = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname === "/register";

  return (
    <nav
      className="absolute top-0"
      style={{ width: "100%", backgroundColor: "#222a3f" }}
    >
      <ul className="flex justify-between">
        <li>
          <NavLink to="/">
            <div className="text-white ml-10 text-lg mt-4">EventEcho</div>
          </NavLink>
        </li>
        <li>
          {isRegisterPage ? (
            <NavLink to="/">
              <div className="text-white mr-10 text-lg mt-4">Login</div>
            </NavLink>
          ) : (
            <NavLink to="/register">
              <div className="text-white mr-10 text-lg mt-4">Register</div>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;
