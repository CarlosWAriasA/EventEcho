import TextInput from "../../components/Input/InputForm";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BoyIcon from "@mui/icons-material/Boy";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
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
import { Trash2 } from "lucide-react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import blobsToFiles from "../../utils/blobToFile";

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

  useEffect(() => {
    fetchCity();
  }, [clickedPosition]);

  const loadEvent = async (id) => {
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const result = await RequestHelper.get(`events/${id}`);
      const imageUrls = JSON.parse(result.image).map((image) => `${image}`);
      const images = [];

      setEvent((prev) => ({
        ...prev,
        name: result.title,
        amountPeople: result.attendees,
        description: result.description,
        date: dayjs(result.date),
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

  const createEvent = async () => {
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
        console.log(images);
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

  function handleClick(event) {
    setClickedPosition(event.latlng);
  }

  function ClickHandler() {
    useMapEvents({
      click: handleClick,
    });
    return null;
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const remainingSlots = 4 - images.length;
    const toProcess = imageFiles.slice(0, remainingSlots);

    setImages((prevImages) => [...prevImages, ...toProcess]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const remainingSlots = 4 - images.length;
    const toProcess = imageFiles.slice(0, remainingSlots);

    // Guardar las imágenes como objetos File en el estado
    setImages((prevImages) => [...prevImages, ...toProcess]);
  };

  const closeModal = () => {
    setModalImageUpload(false);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <main className="bg-white h-full text-black pl-16 pt-16 overflow-y-auto">
      <div className="flex gap-52">
        {modalImageUpload && (
          <Modal show={modalImageUpload} size="md" onClose={closeModal} popup>
            <Modal.Header>Cargar Imágenes</Modal.Header>
            <Modal.Body>
              <label
                htmlFor="fileInput"
                className="custom-file-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                Seleccionar o Soltar Imágenes
                <input
                  className="p-8 border-4 border-dashed border-gray-500"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  multiple
                  id="fileInput"
                />
              </label>
              <div className="ml-7">
                {images.map((imageUrl, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={URL.createObjectURL(imageUrl)}
                      alt={`Imagen ${index + 1}`}
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="delete-button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
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
            <div className="flex gap-8 mt-5">
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
            <MapContainer
              center={[18.8137633, -69.5430503]}
              zoom={7.5}
              style={{ height: "400px", zIndex: 1 }}
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
