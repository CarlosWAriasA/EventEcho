import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavbarAuth = () => {
  const location = useLocation();

  const { userLogged, _ } = useContext(AuthContext); // El underscore significa que la variable asignada no se usará
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <nav
      className="absolute top-0"
      style={{
        width: "100%",
        height: "3.5rem",
        backgroundColor: isLoginPage || isRegisterPage ? "#222a3f" : "white",
      }}
    >
      <ul className="flex justify-between">
        <li>
          <NavLink to={userLogged ? '/' : '/login' }>
            <div
              className={`font-quicksand font-bold  ml-10 text-2xl mt-4 ${
                isLoginPage || isRegisterPage ? "text-white" : "text-black"
              }`}
            >
              EventEcho
            </div>
          </NavLink>
        </li>
        <li>
          {isRegisterPage ? (
            <NavLink to="/login">
              <div className="font-quicksand font-semibold text-white mr-10 text-lg mt-4">
                Iniciar Sesión
              </div>
            </NavLink>
          ) : isLoginPage ? (
            <NavLink to="/register">
              <div className="font-quicksand font-semibold text-white mr-10 text-lg mt-4">
                Registrarse
              </div>
            </NavLink>
          ) : (
            <li className="flex mt-4">
              <NavLink to="/register">
                <div 
                  className="font-quicksand font-semibold  mr-10 text-lg mt-4"
                  style={{ color: 'rgba(33, 42, 62, 1)' }}
                >
                  Registrarse
                </div>
              </NavLink>
              <NavLink to="/login">
                <div 
                  className="flex items-center justify-center font-quicksand font-semibold text-white mr-10 text-lg mt-4"
                  style={{
                    width: '8rem',
                    color: 'rgba(33, 42, 62, 1)',
                    borderRadius: '.5rem',
                    backgroundColor: 'rgba(254, 219, 57, 0.7)'
                  }}
                 >
                  Iniciar Sesión
                </div>
              </NavLink>
            </li>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;
