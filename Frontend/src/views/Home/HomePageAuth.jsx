import { Ban, LayoutGrid } from "lucide-react";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export function HomePageAuth() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    ToastHelper.warning(
      "Tienes que estar logueado para acceder a estas funcionalidades"
    );
  };

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("events");
      const events = result?.map(async (e) => {
        let image;
        const imageUrls = e.image ? e.image : [];

        if (imageUrls.length > 0) {
          try {
            const blob = await RequestHelper.get(imageUrls[0], "image");
            image = new File([blob], `image_.jpg`, {
              type: "image/jpeg",
            });
          } catch (e) {
            console.error(e);
          }
        }

        return {
          id: e.id,
          name: e.title,
          location: e.location,
          amount: `${0}/${e.attendees}`,
          people: e.attendees,
          date: new Date(e.date),
          image: image,
        };
      });
      Promise.all(events)
        .then((events) => {
          setEvents(events);
        })
        .catch((error) => {
          console.error("Error al obtener eventos:", error);
        });
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="w-full bg-white select-none">
      <div className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-50 flex items-center justify-center">
        <Ban
          size={50}
          color="#f0ad4e"
          className="text-gray-500 absolute bg-blue-900 p-2"
          style={{ zIndex: 1000, top: -25, borderRadius: "50%" }}
        />
      </div>
      <div className="text-black absolute top-0 w-full">
        <ul className="flex justify-between">
          <li>
            <NavLink to="/">
              <div className="ml-10 text-lg mt-2 font-bold">EventEcho</div>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink to="/register">
              <div className="mr-10 text-lg mt-2">Registrarse</div>
            </NavLink>
            <NavLink to="/login">
              <div className="bg-yellow-400 pl-2 pr-2 rounded-md mr-10 text-lg mt-2">
                Login
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className="bg-white h-full overflow-y-auto text-black w-full"
        style={{ marginTop: "45px", height: "93.9vh" }}
        onClick={handleClick}
      >
        <div
          className="flex flex-col items-center"
          style={{ height: "500px", maxHeight: "500px" }}
        >
          {isLoading ? (
            <div style={{ width: "80%", height: "400px" }}>
              <Skeleton height={400} />
            </div>
          ) : (
            <>
              {" "}
              <img
                className="rounded-md mt-5 border-4 border-black"
                src={
                  events.length > 0 && events[0]?.image
                    ? URL.createObjectURL(events[0].image)
                    : "/images/default-image.jpg"
                }
                style={{ width: "80%", height: "400px" }}
                alt="Description of your image"
              />
              <div className="relative bg-blue-950 text-white bottom-9 w-96 text-center rounded-lg p-6 overflow-hidden whitespace-nowrap">
                {events.length > 0 ? events[0]?.name : "Crea el primer evento"}
              </div>
            </>
          )}
        </div>
        <div className="ml-36 mr-36">
          <div className="flex justify-between">
            <h2 className="text-black text-lg">Eventos</h2>
            <div className="flex gap-3">
              <div className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white">
                Fecha
                <LayoutGrid size={18} />
              </div>
              <div className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white">
                Nombre
                <LayoutGrid size={18} />
              </div>
            </div>
          </div>
          <div className="mt-10 mb-36 grid grid-cols-3 gap-4 mr-10 ml-10">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} loading />
              ))
            ) : (
              <>
                {events.slice(1).map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.name}
                    content={card.location}
                    image={card.image && URL.createObjectURL(card.image)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageAuth;
