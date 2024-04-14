import { NavLink, useLocation } from "react-router-dom";

const NavbarAuth = () => {
  const location = useLocation();

  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isResetPasswordPage = location.pathname.startsWith("/reset-password");

  return (
    <nav
      className="absolute top-0"
      style={{
        width: "100%",
        height: "3.5rem",
        backgroundColor:
          isLoginPage || isRegisterPage || isResetPasswordPage
            ? "#222a3f"
            : "white",
      }}
    >
      <ul className="flex justify-between">
        <li>
          <NavLink to="/">
            <div
              className={`font-quicksand font-bold  ml-10 text-2xl mt-4 ${
                isLoginPage || isResetPasswordPage || isRegisterPage
                  ? "text-white"
                  : "text-black"
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
            <div className="flex mt-4">
              <NavLink to="/register">
                <div
                  className={`mr-10 text-lg mt-2 ${
                    isResetPasswordPage ? "text-white" : "text-black"
                  } `}
                >
                  Registrarse
                </div>
              </NavLink>
              <NavLink to="/login">
                <div
                  className={
                    isResetPasswordPage
                      ? "mr-10 text-lg mt-2"
                      : "bg-yellow-400 pl-2 pr-2 rounded-md mr-10 text-lg mt-2 text-black"
                  }
                >
                  Login
                </div>
              </NavLink>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAuth;
