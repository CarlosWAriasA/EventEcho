import TextInput from "../../components/Input/InputForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BoyIcon from "@mui/icons-material/Boy";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useContext, useEffect } from "react";
import "./Event.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import UploadImageModal from "../../components/Modal/UploadImageModal";
import Mapa from "../../components/Mapa/Mapa";
import useKeypress from "react-use-keypress";
import { KEY_ENTER, KEY_ESCAPE } from "../../utils/constants";

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
  const [modalDelete, setModalDelete] = useState(false);
  const [modalImageUpload, setModalImageUpload] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(Id) > 0) {
      loadEvent(parseInt(Id));
    }
  }, [Id]);

  const loadEvent = async (id) => {
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const result = await RequestHelper.get(`events/${id}`);

      const imageUrls = result.image ? result.image : [];
      const images = [];

      setEvent((prev) => ({
        ...prev,
        name: result.title,
        amountPeople: result.attendees,
        description: result.description,
        date: dayjs(result.date),
        location: result.location,
      }));

      if (imageUrls.length > 0) {
        imageUrls.forEach(async (i) => {
          const blob = await RequestHelper.get(i, "image");
          images.push(
            new File([blob], `image_${images.length}.jpg`, {
              type: "image/jpeg",
            })
          );
        });
        setImages(images);
      }

      setClickedPosition({
        lat: parseFloat(result.latitud ?? 0),
        lng: parseFloat(result.longitud ?? 0),
      });
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

  async function fetchCity(lat, lng) {
    setIsLoading(true);
    try {
      if (!clickedPosition) return;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      setEvent((prev) => ({
        ...prev,
        location: data?.display_name,
      }));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  const validateEvent = () => {
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

    if (images.length < 1) {
      ToastHelper.error("Al menos una imagen es requerida");
      return false;
    }

    if (!clickedPosition?.lat || !clickedPosition.lng) {
      ToastHelper.error("La Localizacion es requerida.");
      return false;
    }

    return true;
  };

  const deleteEvent = async () => {
    setIsLoading(true);
    try {
      await RequestHelper.delete(`events/${Id}`);
      ToastHelper.success("Evento eliminado exitosamente");
      navigate("/event-admin");
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  const saveEvent = async () => {
    try {
      setIsLoading(true);
      if (validateEvent()) {
        const formData = new FormData();

        formData.append("title", event.name);
        formData.append("description", event.description);
        formData.append("date", event.date);
        formData.append("attendees", event.amountPeople);
        formData.append("location", event.location);
        formData.append("longitud", clickedPosition.lng);
        formData.append("latitud", clickedPosition.lat);

        for (const file of images) {
          formData.append("images", file);
        }

        if (Id > 0) {
          await RequestHelper.put(`events/${Id}`, formData, true);
        } else {
          await RequestHelper.post("events", formData, true);
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

  useKeypress([KEY_ENTER], saveEvent);
  useKeypress([KEY_ESCAPE], () => {
    navigate("/event-admin");
  });
  return (
    <main className="bg-white h-full text-black pl-16 pt-16 overflow-y-auto">
      <div className="flex gap-52">
        {modalImageUpload && (
          <UploadImageModal
            showModal={modalImageUpload}
            setShowModal={setModalImageUpload}
            images={images}
            setImages={setImages}
          />
        )}
        {modalDelete && (
          <Modal
            show={modalDelete}
            size="md"
            onClose={() => setModalDelete(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  ¿Estas seguro que deseas eliminar este evento?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={deleteEvent}>
                    {"Si, Estoy seguro"}
                  </Button>
                  <Button color="gray" onClick={() => setModalDelete(false)}>
                    No, cancelar
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
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
                  onChange={(e) => {
                    const inputValue = parseInt(e.target.value);
                    if (!isNaN(inputValue) && inputValue >= 0) {
                      setEvent((prev) => ({
                        ...prev,
                        amountPeople: inputValue,
                      }));
                    }
                  }}
                  icon={<BoyIcon />}
                />
              </div>
            </div>
            <div className="flex gap-8 mt-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
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
              <div
                className="rounded-lg w-72 border border-gray-300 p-2 flex items-center justify-between cursor-pointer"
                onClick={() => setModalImageUpload(true)}
              >
                <span>Imagenes ({images?.length})</span>
                <KeyboardDoubleArrowUpIcon />
              </div>
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
            <div className="flex justify-between gap-5 mt-5">
              <div className="flex gap-5">
                <button
                  onClick={saveEvent}
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
              {parseInt(Id) > 0 && (
                <Trash2
                  onClick={() => setModalDelete(true)}
                  className="hover:cursor-pointer hover:border-2"
                  color="red"
                  size={38}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-16" style={{ width: "50%" }}>
          <div style={{ width: "500px" }}>
            <p className="flex justify-end text-xl font-bold mb-4">
              Localización
            </p>
            <Mapa
              value={clickedPosition}
              setValue={setClickedPosition}
              onClick={fetchCity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventEdit;
