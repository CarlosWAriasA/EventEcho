import TextInput from "../../components/Input/InputForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BoyIcon from "@mui/icons-material/Boy";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import "./Event.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { NavLink } from "react-router-dom";

function EventEdit() {
  const [event, setEvent] = useState({
    name: "",
    amountPeople: "",
    date: "",
    description: "",
  });

  return (
    <main className="bg-white h-full text-black pl-16 pt-16 overflow-y-auto">
      <div className="flex gap-52">
        <div>
          <div>
            <h1 className="font-bold" style={{ fontSize: "3em" }}>
              Crea tu Propio Evento
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
                value={event.amountPeople}
                onChange={(e) =>
                  setEvent((prev) => ({
                    ...prev,
                    amountPeople: e.target.value,
                  }))
                }
                multiline
                rows={6}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <button className="bg-blue-950 p-2 pl-5 pr-5 rounded-lg text-white hover:bg-blue-900 w-36">
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
            </MapContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventEdit;
