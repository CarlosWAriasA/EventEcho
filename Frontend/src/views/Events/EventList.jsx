import { blue } from "@mui/material/colors";
import { color } from "@mui/system";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Card from "../../components/Card/CardEventList";
import CardEventList from "../../components/Card/CardEventList";
import { forwardRef, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { NavLink, useNavigate } from "react-router-dom";
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";

const EventList = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("events/events-user");
      const formatData = result.map(async (event) => {
        const imageUrls = event.image ? event.image : [];

        if (imageUrls.length > 0) {
          for (const imageUrl of imageUrls) {
            try {
              const blob = await RequestHelper.get(imageUrl, "image");
              console.log(blob);
              event.photo = new File([blob], `image_${images.length}.jpg`, {
                type: "image/jpeg",
              });
              images.push(
                new File([blob], `image_${images.length}.jpg`, {
                  type: "image/jpeg",
                })
              );
            } catch (error) {
              console.log(error);
            }
          }
          console.log(images);
          setImages(images);
        }

        return event;
      });
      console.log(result);
      setEvents(result);
    } catch (error) {
      console.log(error);
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      const remainingTime = 500 - (Date.now() - startTime);
      if (remainingTime > 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        setIsLoading(false);
      }
    }
  };

  const EventsData = [
    {
      id: 1,
      title: "Fiesta en la Plaza",
      content: "Acompañanos en nuestra fiesta",
      time: "6:30",
      place: "Plaza de la Bandera",
    },
    {
      id: 2,
      title: "Aventura deportiva colectiva",
      content: "Aconpañanos en esta aventura deportiva",
      time: "8:30",
      place: "Centro Olimpico",
    },
    {
      id: 3,
      title: "Conocedores de Historia",
      content: "En la misma conoceremos la historia del faro",
      time: "6:30",
      place: "El faro a Colon",
    },
    {
      id: 4,
      title: "Aventureros por la ciudad",
      content: "Aventura por la Nuñez de Caceres",
      time: "6:30",
      place: "La nuñez de Caceres",
    },
  ];

  return (
    <main
      className="bg-white text-black h-full overflow-y-auto"
      style={{ backgroundColor: "#D8E1EE" }}
    >
      <div className="flex justify-inline flex-col">
        <div className="flex">
          <div
            className="flex flex-col columns-6  w-3/4 bg-blue-500 p-8 rounded-3xl ml-10 mt-10 text-white"
            style={{ backgroundColor: "#394867" }}
          >
            <div className="flex mb-2">
              <h1 style={{ fontSize: "22px" }}>
                Hora de Salir a comer con Chanchito
              </h1>
            </div>
            <div className="flex mb-2">
              <h3 className="pr-2">
                <LocationOnOutlinedIcon
                  sx={{ color: "yellow", fontSize: "20px" }}
                />
              </h3>
              <h3>Santo Domingo, Naco</h3>{" "}
            </div>
            <div className="flex mb-2">
              <h3 className="pr-2">
                <AccessTimeIcon sx={{ color: "yellow", fontSize: "20px" }} />
              </h3>
              <h3>07:30 PM</h3>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col columns-6 max-w-screen-xl w-3/4 bg-blue-500 p-8 ml-10 mt-10"
          style={{ backgroundColor: "#FCFCFC" }}
        >
          {events && events.length > 0 ? (
            events.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                imageUrl={card.photo && URL.createObjectURL(card.photo)}
                content={card.description}
                place={card.location}
                time={card.date}
              ></Card>
            ))
          ) : (
            <h1 className="">No tiene ningun evento inscrito.</h1>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventList;
