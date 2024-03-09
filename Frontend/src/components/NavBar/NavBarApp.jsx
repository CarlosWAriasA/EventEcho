import {
  CircleUserRound,
  LogOut,
  UserRound,
  ArrowBigLeft,
  Bell,
  CalendarCheck,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

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
            <div className="">
              <CalendarCheck
                className="hover:cursor-pointer select-none"
                color="black"
                size={25}
              />
            </div>
          </NavLink>
          <NavLink to={"/home"}>
            <div className="">
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
              <div className="mr-10">
                <ArrowBigLeft
                  className="hover:cursor-pointer select-none"
                  color="black"
                  size={30}
                  style={{
                    borderRadius: "50%",
                    padding: "2px",
                    backgroundColor: "yellow",
                  }}
                />
              </div>
            </NavLink>
          ) : (
            <div>
              <div className="mr-10" ref={optionsRef}>
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
                        Profile
                      </li>
                    </NavLink>
                    <li
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-400 hover:rounded-b-md"
                    >
                      <LogOut size={18} color="red" />
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarApp;
