import { CircleUserRound, Clock, MapPin, UserRound } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import { Carousel } from "flowbite-react";
import "./Event.css";
import useKeypress from "react-use-keypress";
import { KEY_ESCAPE } from "../../utils/constants";
import { useNavigate } from "react-router";

function EventDetail() {
  const { Id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState({
    id: "",
    name: "",
    location: "",
    date: "",
    people: "",
    desc: "",
    userId: "",
  });
  const { setIsLoading } = useContext(LoadingContext);
  const [isRegister, setIsRegister] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const loadEvent = async (id) => {
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const result = await RequestHelper.get(`events/${id}`);
      const isRegister = await RequestHelper.get(`events/events-user/${id}`);
      const imageUrls = result.image ? result.image : [];
      const images = [];

      if (isRegister.isRegister) {
        setIsRegister(true);
      } else {
        setIsRegister(false);
      }
      setEvent((prev) => ({
        ...prev,
        id: result.id,
        name: result.title,
        people: result.attendees,
        desc: result.description,
        date: new Date(result.date).toLocaleString(),
        location: result.location,
        userId: result.userId,
      }));
      if (imageUrls.length > 0) {
        for (const imageUrl of imageUrls) {
          const blob = await RequestHelper.get(imageUrl, "image");
          images.push(
            new File([blob], `image_${images.length}.jpg`, {
              type: "image/jpeg",
            })
          );
        }
        setImages(images);
      }
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      const remainingTime = 200 - (Date.now() - startTime);
      if (remainingTime > 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        setIsLoading(false);
      }
    }
  };

  const registerUserToEvent = async () => {
    try {
      if (isRegister) {
        await RequestHelper.delete(`events/delete-user`, {
          eventId: event.id,
        });
        setIsRegister(false);
        ToastHelper.success("Desinscrito exitosamente");
      } else {
        await RequestHelper.post(`events/register-user`, {
          eventId: event.id,
        });
        setIsRegister(true);
        ToastHelper.success("Inscrito exitosamente");
      }
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    }
  };

  useEffect(() => {
    if (parseInt(Id) > 0) {
      loadEvent(parseInt(Id));
    }
  }, [Id]);

  const defaultImageUrl = "/images/default-image.jpg";

  useKeypress(KEY_ESCAPE, () => {
    navigate("/");
  });

  return (
    <main className="bg-white h-full pl-16 pt-16 text-black overflow-y-auto">
      <div className="flex gap-6">
        {images.length > 0 ? (
          <div
            className="h-56 sm:h-64 xl:h-80 2xl:h-96"
            style={{ width: "50%" }}
          >
            <Carousel slideInterval={5000}>
              {images.map((image, i) => (
                <img
                  key={image.name + i}
                  src={URL.createObjectURL(image)}
                  className="object-cover w-full h-auto mb-4"
                  alt={image.name}
                />
              ))}
            </Carousel>
          </div>
        ) : (
          <img
            src={defaultImageUrl}
            alt="Imagen por defecto"
            className="object-cover mb-4"
            style={{ width: "50%", maxHeight: "22em", height: "25em" }}
          />
        )}
        <div>
          <h2
            style={{
              fontSize: "4em",
              paddingBottom: "5px",
              paddingTop: "-5px",
            }}
          >
            {event.name.length > 20
              ? `${event.name.substring(0, 20)}...`
              : event.name}
          </h2>
          <div className="flex gap-2">
            <MapPin
              className="hover:cursor-pointer select-none"
              color="white"
              fill="yellow"
              size={35}
            />
            <p className="text-gray-400 m-0 pt-1 max-w-72">{event.location}</p>
          </div>
          <div className="flex gap-2 mt-3">
            <Clock
              className="hover:cursor-pointer select-none"
              color="white"
              size={35}
              fill="yellow"
            />
            <p className="text-gray-400 m-0 pt-1">{event.date}</p>
          </div>
          <div className="flex gap-2 mt-4 ml-1">
            <div className="flex">
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{ zIndex: 1, borderRadius: "50%", padding: "2px" }}
              />
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  marginLeft: "-10px",
                  zIndex: 2,
                }}
              />
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  marginLeft: "-10px",
                  zIndex: 3,
                }}
              />
            </div>
            <p className="m-0">+{event.people}</p>
          </div>
          {user.id !== event.userId && (
            <div className="mt-4">
              <Button
                onClick={registerUserToEvent}
                label={isRegister ? "Desinscribirse" : "Inscribirse"}
                className={`p-2 pl-5 pr-5 rounded-lg text-white w-36 ${
                  isRegister
                    ? "bg-red-800"
                    : "bg-yellow-300 hover:bg-yellow-400"
                }`}
              />
            </div>
          )}
          <p className="m-0 pt-3 text-black" style={{ fontSize: "2em" }}>
            {event.desc}
          </p>
        </div>
      </div>
      <div className="mb-2 mt-10" style={{ fontSize: "2em" }}>
        Comentarios
      </div>
      <div
        className="mb-10 p-8"
        style={{ width: "50%", height: "22em", backgroundColor: "#394867" }}
      >
        <div className="flex gap-2">
          <CircleUserRound size={25} style={{ marginTop: "3px" }} />
          <div>
            <p className="m-0 p-0 text-lg">Lorem ipsum</p>
            <p className="m-0 p-0">Lorem ipsum</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventDetail;
