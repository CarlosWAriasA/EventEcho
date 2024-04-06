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
            <div className="font-quicksand font-bold text-white ml-10 text-2xl mt-4">EventEcho</div>
          </NavLink>
        </li>
        <li>
          {isRegisterPage ? (
            <NavLink to="/login">
              <div className="font-quicksand font-semibold text-white mr-10 text-lg mt-4">Iniciar Sesión</div>
            </NavLink>
          ) : (
            <NavLink to="/register">
              <div className="font-quicksand font-semibold text-white mr-10 text-lg mt-4">Registrarse</div>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;
