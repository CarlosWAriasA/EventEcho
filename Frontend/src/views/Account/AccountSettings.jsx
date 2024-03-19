import { useState, useEffect, useContext } from "react";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import RequestHelper from "../../utils/requestHelper";
import { SquarePen } from "lucide-react";
import UploadImageModal from "../../components/Modal/UploadImageModal";

function AccountSettings() {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    age: "",
    description: "",
  });
  const { setIsLoading } = useContext(LoadingContext);
  const [image, setImage] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const result = await RequestHelper.get("profile");

      setUser({
        age: result.age,
        description: result.description,
        email: result.email,
        name: result.name,
      });
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  const guardarCambios = async () => {
    setIsLoading(true);
    try {
      const updatedUser = {
        name: user.name,
        lastname: user.name,
        username: user.name,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        profileImage: image[0] ?? null,
        age: user.age,
        description: user.description,
      };
      console.log(updatedUser);
      await RequestHelper.put("profile", updatedUser);
      ToastHelper.success("Guardado exitosamente");
    } catch (error) {
      console.log(error);
      ToastHelper.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white h-full text-black pt-10 pl-16">
      {showImageModal && (
        <UploadImageModal
          showModal={showImageModal}
          setShowModal={setShowImageModal}
          images={image}
          setImages={setImage}
          maxImages={1}
        />
      )}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg " style={{ fontSize: "45px" }}>
          Configuración de la Cuenta
        </h2>
        <div className="w-16 h-3 bg-yellow-400 rounded-sm"></div>
      </div>
      <div className="flex">
        <div className="mt-14" style={{ width: "50%" }}>
          <div className="flex gap-20">
            <div className="flex flex-col w-64">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Nombre"
                type="text"
                value={user.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col w-80">
              <label>Correo Electronico</label>
              <input
                className="border p-2 rounded-md border-gray-500 bg-gray-500"
                placeholder="Email"
                disabled
                style={{ opacity: 0.5, cursor: "not-allowed" }}
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-20 mt-5">
            <div className="flex flex-col w-64">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                className="border p-2 rounded-md border-gray-500 bg-gray-500"
                value={"123456"}
                placeholder="Contraseña"
                type="password"
                style={{ opacity: 0.5, cursor: "not-allowed" }}
                disabled
              />
            </div>
            <div className="flex flex-col w-32">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Edad"
                type="number"
                value={user.age}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, age: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col w-80">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Descripcion"
                rows={5}
                value={user.description}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={guardarCambios}
              className="bg-blue-950 p-2 pl-5 pr-5 rounded-lg text-white hover:bg-blue-900"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
        <div className="ml-20 flex flex-col align-middle content-center relative">
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setShowImageModal(true)}
              className="bg-transparent border-none"
            >
              <SquarePen size={25} />
            </button>
          </div>
          <img
            alt="imagen usuario"
            src="/images/default-image.jpg"
            width={240}
            style={{ height: "220px", maxHeight: "400px", borderRadius: "50%" }}
          />
          <div className="mt-8">
            <button
              style={{ borderWidth: "3px" }}
              className="border border-blue-950 p-2 pl-16 ml-2 pr-16 rounded-lg hover:bg-blue-950 hover:text-white"
            >
              Eliminar Foto
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountSettings;