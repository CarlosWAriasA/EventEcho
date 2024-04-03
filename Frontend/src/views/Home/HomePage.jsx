import { LayoutGrid } from "lucide-react";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Container } from "@mui/material";

export function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const sortByDate = () => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents([events[0], ...sortedEvents.slice(1)]);
  };

  const sortByName = () => {
    const sortedEvents = [...events];
    sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
    setEvents([events[0], ...sortedEvents.slice(1)]);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="bg-white h-full overflow-y-auto text-black">
      <NavLink
        to={`${events.length > 0 ? `event-detail/${events[0].id}` : ""}`}
      >
        <div
          className="flex flex-col items-center cursor-default"
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
                className="rounded-lg mt-5 border-4 "
                src={
                  events.length > 0 && events[0]?.image
                    ? URL.createObjectURL(events[0].image)
                    : "/images/default-image.jpg"
                }
                style={{ width: "80%", height: "400px" }}
                alt="Description of your image"
              />
              <Container
                className="relative text-white bottom-9 w-96 text-center rounded-lg p-6 overflow-hidden whitespace-nowrap"
                sx={{
                  width: 300,
                  backgroundColor: '#212A3E',
                }}
              >
                {events.length > 0 ? events[0]?.name : <p className="font-quicksand font-medium tracking-wide">Sé el primer evento</p>}
              </Container>
            </>
          )}
        </div>
      </NavLink>
      <div className="ml-36 mr-36">
        <div className="flex justify-between">
          <h2 className="font-quicksand font-medium text-2xl" style={{color: '#212A3E'}}>Eventos</h2>
          <div className="flex gap-3">
            <div
              onClick={sortByDate}
              className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white"
            >
              Fecha
              <LayoutGrid size={18} />
            </div>
            <div
              onClick={sortByName}
              className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white"
            >
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
  );
}

export default HomePage;
