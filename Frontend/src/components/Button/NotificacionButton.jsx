import { CircleUserRound } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import "./NotificacionButton.css";
import { NotificationIcon } from "../icons/iconComponents";

function NotificacionButton() {
  const { user } = useContext(AuthContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isEventDetail = location.pathname.includes("/event-detail");
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user) {
      getNotificaciones();
    }
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const updateNotificacion = async (id) => {
    try {
      await RequestHelper.put("notificaciones", {
        id: id,
        read: true,
      });
      getNotificaciones();
    } catch (error) {
      ToastHelper.error(error.message ?? "Ha ocurrido un error");
    }
  };

  const getNotificaciones = async () => {
    try {
      const result = await RequestHelper.get("notificaciones", {
        source: "C",
        userRecieverId: user.id,
      });
      setNotificaciones(result);
      setPendingCount(result.filter((r) => !r.read).length);
    } catch (error) {
      ToastHelper.error(error.message ?? "Ha ocurrido un error");
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown select-none">
      <div onClick={handleDropdownToggle}>
        <NotificationIcon
          className={"hover:cursor-pointer"}
          sx={{
            fontSize: 28,
          }}
        />
        {pendingCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-1px",
              right: "-4px",
              backgroundColor: "yellow",
              color: "black",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {pendingCount}
          </div>
        )}
      </div>
      <div
        className={`dropdown-content ${isDropdownOpen ? "active" : ""}`}
        style={{
          left: isEventDetail && notificaciones.length > 0 ? "-21vw" : "-11vw",
        }}
      >
        {notificaciones.length > 0 ? (
          notificaciones.map((n) => {
            const comentario = n.Comentario;
            return (
              <NavLink
                to={`/event-detail/${comentario?.eventId}`}
                key={comentario?.id}
              >
                <div
                  key={comentario?.id}
                  className={`${
                    n.read ? "bg-gray-500" : "bg-blue-500"
                  }  rounded-xl p-5 flex flex-col mt-2 text-white w-80`}
                  onClick={() =>
                    !n.read ? updateNotificacion(n.id) : () => {}
                  }
                >
                  <div className="flex items-center gap-1">
                    {n.Usuario.image64 ? (
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        src={`data:image/png;base64, ${comentario?.Usuario?.image64}`}
                      />
                    ) : (
                      <CircleUserRound size={20} />
                    )}
                    <p>{n.Usuario.name}</p>
                  </div>
                  <p className="mt-2">
                    {n.description.length > 200
                      ? `${n.description.substring(0, 200)}...`
                      : n.description}
                  </p>
                </div>
              </NavLink>
            );
          })
        ) : (
          <p className="text-black">No hay notificaciones pendientes</p>
        )}
      </div>
    </div>
  );
}

export default NotificacionButton;
