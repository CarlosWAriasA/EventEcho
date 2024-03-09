import {
  CircleUserRound,
  LogOut,
  UserRound,
  Bell,
  CalendarCheck,
  ListChecks,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Tooltip } from "react-tooltip";

const NavbarApp = () => {
  const optionsRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();
  const isEventDetail = location.pathname === "/event-detail";

  const handleIconClick = (event) => {
    event.preventDefault();
    setShowOptions(!showOptions);
  };

  const handleProfileClick = () => {
    setShowOptions(false);
  };

  const handleLogoutClick = () => {
    logout();
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
            <div className="text-black ml-10 text-lg mt-2">EventEcho</div>
          </NavLink>
        </li>
        <li className="flex gap-6 content-center pt-3">
          <NavLink to={"/home"}>
            <div
              id="events"
              data-tooltip-id="tooltip"
              data-tooltip-content="Administrar Eventos"
            >
              <ListChecks
                className="hover:cursor-pointer select-none"
                color="black"
                size={25}
              />
            </div>
          </NavLink>
          <NavLink to={"/event-edit"}>
            <div
              id="events"
              data-tooltip-id="tooltip"
              data-tooltip-content="Mis eventos"
            >
              <CalendarCheck
                className="hover:cursor-pointer select-none"
                color="black"
                size={25}
              />
            </div>
          </NavLink>
          <NavLink to={"/home"}>
            <div
              data-tooltip-id="tooltip"
              data-tooltip-content="Notificaciones"
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
                className="mr-10"
                ref={optionsRef}
                data-tooltip-id={"tooltip"}
                data-tooltip-content="Mi Cuenta"
              >
                <CircleUserRound
                  className="hover:cursor-pointer select-none"
                  color="black"
                  onClick={handleIconClick}
                  size={25}
                />
              </div>
              {showOptions && (
                <div className="absolute right-12 w-44 top-11 bg-gray-800 rounded-md ">
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
