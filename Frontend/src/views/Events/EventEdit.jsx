import TextInput from "../../components/Input/InputForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BoyIcon from "@mui/icons-material/Boy";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useContext, useEffect } from "react";
import "./Event.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import dayjs from "dayjs";

function EventEdit() {
  const { setIsLoading } = useContext(LoadingContext);
  const { Id } = useParams();
  const [event, setEvent] = useState({
    name: "",
    amountPeople: "",
    date: "",
    description: "",
    latitud: "",
    longitud: "",
    location: "",
  });
  const [clickedPosition, setClickedPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(Id) > 0) {
      loadEvent(parseInt(Id));
    }
  }, []);

  useEffect(() => {
    fetchCity();
  }, [clickedPosition]);

  const loadEvent = async (id) => {
    try {
      setIsLoading(true);
      const result = await RequestHelper.get(`events/${id}`);
      setEvent((prev) => ({
        ...prev,
        name: result.title,
        amountPeople: result.attendees,
        description: result.description,
        date: dayjs(result.date),
      }));

      setClickedPosition({
        lat: parseFloat(result.latitud ?? 0),
        lng: parseFloat(result.longitud ?? 0),
      });
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchCity() {
    if (!clickedPosition) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${clickedPosition.lat}&lon=${clickedPosition.lng}&format=json`
    );
    const data = await response.json();

    setEvent((prev) => ({
      ...prev,
      location: data?.address?.city ?? data.address?.country,
    }));
  }

  const validateUser = () => {
    if (!event.name) {
      ToastHelper.error("El Nombre del Evento es requerido.");
      return false;
    }

    if (!event.amountPeople) {
      ToastHelper.error("La Cantidad de Personas es requerida.");
      return false;
    }

    if (!event.date) {
      ToastHelper.error("La Fecha es requerida.");
      return false;
    }

    if (!clickedPosition?.lat || !clickedPosition.lng) {
      ToastHelper.error("La Localizacion es requerida.");
      return false;
    }

    return true;
  };

  const createEvent = async () => {
    try {
      setIsLoading(true);
      if (validateUser()) {
        if (Id > 0) {
          await RequestHelper.put(`events/${Id}`, {
            title: event.name,
            description: event.description,
            date: event.date,
            image: "",
            attendees: event.amountPeople,
            location: event.location,
            longitud: clickedPosition.lng,
            latitud: clickedPosition.lat,
          });
        } else {
          await RequestHelper.post("events", {
            title: event.name,
            description: event.description,
            date: event.date,
            image: "",
            attendees: event.amountPeople,
            location: event.location,
            longitud: clickedPosition.lng,
            latitud: clickedPosition.lat,
          });
        }
        ToastHelper.success("Guardado exitosamente");
        navigate("/event-admin");
      }
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  function handleClick(event) {
    setClickedPosition(event.latlng);
  }

  function ClickHandler() {
    useMapEvents({
      click: handleClick,
    });
    return null;
  }

  return (
    <main className="bg-white h-full text-black pl-16 pt-16 overflow-y-auto">
      <div className="flex gap-52">
        <div>
          <div>
            <h1 className="font-bold" style={{ fontSize: "3em" }}>
              {Id ? "Actualizar Evento" : "Crea tu Propio Evento"}
            </h1>
            <div className="w-24 h-3 bg-yellow-400 rounded-sm"></div>
          </div>
          <div className="mt-14">
            <div className="flex gap-16">
              <div className="w-64">
                <TextInput
                  label={"Nombre del Evento"}
                  className="rounded-lg w-72"
                  icon={<DriveFileRenameOutlineIcon />}
                  value={event.name}
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="w-64">
                <TextInput
                  type={"number"}
                  className="rounded-lg w-72"
                  label={"Cantidad de Personas"}
                  value={event.amountPeople}
                  onChange={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      amountPeople: e.target.value,
                    }))
                  }
                  icon={<BoyIcon />}
                />
              </div>
            </div>
            <div className="mt-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-72"
                  label="Fecha"
                  value={event.date}
                  onChange={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      date: e,
                    }))
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="mt-5">
              <TextInput
                className="rounded-lg "
                style={{ width: "38em" }}
                label={"Descripción"}
                value={event.description}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                multiline
                rows={6}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <button
                onClick={createEvent}
                className="bg-blue-950 p-2 pl-5 pr-5 rounded-lg text-white hover:bg-blue-900 w-36"
              >
                Guardar
              </button>
              <NavLink to={"/event-admin"}>
                <button className="border border-blue-950 p-2 w-36 rounded-lg hover:bg-blue-950 hover:text-white">
                  Cancelar
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="mt-16" style={{ width: "50%" }}>
          <div style={{ width: "500px" }}>
            <p className="flex justify-end text-xl font-bold mb-4">
              Localización
            </p>
            <MapContainer
              center={[18.8137633, -69.5430503]}
              zoom={7.5}
              style={{ height: "400px" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickHandler />{" "}
              {clickedPosition && (
                <Marker position={clickedPosition}>
                  <Popup>
                    Latitude: {clickedPosition.lat}
                    <br />
                    Longitude: {clickedPosition.lng}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventEdit;
