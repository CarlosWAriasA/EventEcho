import { useState, useContext } from "react";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import RequestHelper from "../../utils/requestHelper";
import { SquarePen } from "lucide-react";
import UploadImageModal from "../../components/Modal/UploadImageModal";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import TextInput from "../../components/Input/InputForm";
import { Button, TextareaAutosize } from "@mui/material";

function AccountSettings() {
  const { user, setUser, loadUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [image, setImage] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  const guardarCambios = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("lastname", user.lastname);
      formData.append("username", user.username);
      formData.append("email", user.email );
      formData.append("profileImage", image[0]);
      formData.append("age", user.age ?? 0);
      formData.append("description", user.description ?? "");

      await RequestHelper.put("profile", formData, true);
      loadUser();
      ToastHelper.success("Guardado exitosamente");
    } catch (error) {
      ToastHelper.warning(error.message ?? "Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  useKeypress(KEY_ENTER, guardarCambios);
  return (
    <main className="bg-white h-full text-black pt-10 pl-16">
      {showImageModal && (
        <UploadImageModal
          title="Cargan Imagen"
          subtitle="Seleccionar o Soltar Imagen"
          showModal={showImageModal}
          setShowModal={setShowImageModal}
          images={image}
          setImages={setImage}
          maxImages={1}
        />
      )}
      <div className="flex flex-col gap-4">
        <h2 className="font-quicksand font-semibold text-lg " style={{ fontSize: "45px" }}>
          Configuración de la Cuenta
        </h2>
        <div className="w-16 h-3 bg-yellow-400 rounded-sm"></div>
      </div>
      <div className="flex">
        <div className="mt-14" style={{ width: "50%" }}>
          <div className="flex gap-20">
            <div className="flex flex-col w-64">
            <TextInput
              type={"text"}
              label={'Nombre'}
              className="rounded-lg w-72"
              id={'name'}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
              // value={user.name}
              sx={{
                background: "rgb(248, 250, 229, 0.9)",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#FEDB39",
                  height: "7rem",
                  // borderRadius: "0 0 10px 10px",
                },
              }}
              // icon={<HttpsRoundedIcon />}
            />
            </div>
            <div className="flex flex-col w-80">
            <TextInput
              type={"text"}
              label={'Email'}
              className="rounded-lg w-72"
              // id={'name'}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              // value={user.email}
              disabled={true}
              sx={{
                background: "rgb(248, 250, 229, 0.9)",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#FEDB39",
                  height: "7rem",
                  // borderRadius: "0 0 10px 10px",
                },
              }}
              // icon={<HttpsRoundedIcon />}
            />
            </div>
          </div>
          <div className="flex gap-20 mt-5">
            <div className="flex flex-col w-64">
            <TextInput
              type={"password"}
              label={'Contraseña'}
              className="rounded-lg w-72"
              // id={'password'}
                // onChange={(e) =>
                //   setUser((prev) => ({ ...prev, email: e.target.value }))
                // }
              value={'123456'}
              disabled={true}
              sx={{
                background: "rgb(248, 250, 229, 0.9)",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#FEDB39",
                  height: "7rem",
                  // borderRadius: "0 0 10px 10px",
                },
              }}
              // icon={<HttpsRoundedIcon />}
            />
            </div>
            <div className="flex flex-col w-32">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                className="border p-2 rounded-md border-gray-500"
                placeholder="Edad"
                type="number"
                // value={user.age ?? 0}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, age: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col w-80">
              <TextareaAutosize
              id="description"
              maxRows={5}
              onChange={(e) => setUser((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe tu evento"
              style={{
                border: '2px solid #000 !important',
                height: '20%'
              }}
              />
            </div>
          </div>
          <div className="mt-5">
            <Button
            variant="contained"
            onClick={guardarCambios}
            style={{
              fontSize: '1em',
              fontFamily: 'quicksand',
              fontWeight: '600',
              letterSpacing: '.2px',
              wordSpacing: '.2px',
              textTransform: 'none',
              borderRadius: '.8rem',
              backgroundColor: 'rgba(33, 42, 62, 1)'
            }}
            >
              Guardar Cambios
            </Button>
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
            // src={
            //   user.image
            //     ? URL.createObjectURL(user.image)
            //     : "/images/default-image.jpg"
            // }
            width={240}
            style={{
              height: "220px",
              maxHeight: "400px",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              objectFit: "cover",
            }}
          />
          <div className="mt-8">
            <button
              style={{ borderWidth: "3px" }}
              onClick={() => {
                setUser((prev) => ({ ...prev, image: "", profileImage: "" }));
              }}
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
