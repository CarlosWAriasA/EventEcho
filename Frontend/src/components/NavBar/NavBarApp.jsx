import {
  CircleUserRound,
  LogOut,
  UserRound,
  Bell,
  CalendarCheck,
  ListChecks,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";

const NavbarApp = () => {
  const optionsRef = useRef(null);
  const { logout, user } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  const isEventDetail = location.pathname.includes("/event-detail");
  const navigate = useNavigate();

  const handleIconClick = (event) => {
    event.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleProfileClick = () => {
    setShowOptions(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="absolute top-0"
      style={{ width: "100%", backgroundColor: "white", height: "45px" }}
    >
      <ul className="flex justify-between">
        <li>
          <NavLink to="/">
            <div className="text-black ml-10 text-lg mt-2 font-bold">
              EventEcho
            </div>
          </NavLink>
        </li>
        <li className="flex gap-6 content-center pt-1">
          {user?.tipo_usuario === "organizador" && (
            <NavLink to={"/event-admin"}>
              <div
                id="events"
                data-tooltip-id="tooltip"
                data-tooltip-content="Administrar Eventos"
                style={{ paddingTop: "4px" }}
              >
                <ListChecks
                  className="hover:cursor-pointer select-none"
                  color="black"
                  size={25}
                />
              </div>
            </NavLink>
          )}
          <NavLink to={"/event-list"}>
            <div
              id="events"
              data-tooltip-id="tooltip"
              data-tooltip-content="Mis eventos"
              style={{ paddingTop: "4px" }}
            >
              <CalendarCheck
                className="hover:cursor-pointer select-none"
                color="black"
                size={25}
              />
            </div>
          </NavLink>
          <NavLink to={"/"}>
            <div
              data-tooltip-id="tooltip"
              data-tooltip-content="Notificaciones"
              style={{ paddingTop: "4px" }}
            >
              <Bell
                className="hover:cursor-pointer select-none"
                color="black"
                size={25}
                fill="black"
              />
            </div>
          </NavLink>
          {isEventDetail ? (
            <NavLink to={"/"}>
              <div
                className="mr-10"
                data-tooltip-id="tooltip"
                data-tooltip-content="Volver Atras"
                style={{ paddingTop: "4px" }}
              >
                <LogOut
                  color="black"
                  size={25}
                  fill="yellow"
                  style={{
                    borderRadius: "30%",
                    padding: "2px",
                    backgroundColor: "yellow",
                  }}
                />
              </div>
            </NavLink>
          ) : (
            <div>
              <div
                className="mr-10 cursor-pointer"
                ref={optionsRef}
                onClick={handleIconClick}
              >
                <div className="text-white flex gap-2 bg-blue-950 rounded-md px-2 py-1 select-none">
                  <p className="font-bold text-md">{user.name}</p>
                  {user.image ? (
                    <img
                      src={URL.createObjectURL(user.image)}
                      alt="Profile"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <CircleUserRound
                      className="hover:cursor-pointer bg-gray-300 p-1"
                      color="black"
                      style={{ borderRadius: "50%" }}
                      size={25}
                    />
                  )}
                </div>
              </div>
              {showOptions && (
                <div
                  className="absolute right-9 w-44 top-9 bg-gray-800 rounded-md"
                  style={{ zIndex: 100 }}
                >
                  <ul>
                    <NavLink to={"account-settings"}>
                      <li
                        onClick={handleProfileClick}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-400 hover:rounded-t-md"
                      >
                        <UserRound size={18} />
                        Cuenta
                      </li>
                    </NavLink>
                    <li
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-400 hover:rounded-b-md"
                    >
                      <LogOut size={18} color="red" />
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
      <Tooltip id="tooltip" />
    </nav>
  );
};

export default NavbarApp;
