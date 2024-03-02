import { CircleUserRound, LogOut, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavbarApp = () => {
  const optionsRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);

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
        <li ref={optionsRef}>
          <div className="mr-10 mt-2">
            <CircleUserRound
              className="hover:cursor-pointer select-none"
              color="black"
              onClick={handleIconClick}
              size={25}
            />
          </div>
          {showOptions && (
            <div className="absolute right-12 w-44 bg-gray-800 rounded-md ">
              <ul>
                <li
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-400 hover:rounded-t-md"
                >
                  <UserRound size={18} />
                  Profile
                </li>
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
        </li>
      </ul>
    </nav>
  );
};

export default NavbarApp;
