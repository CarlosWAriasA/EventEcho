import { useState, useContext } from "react";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import RequestHelper from "../../utils/requestHelper";
import UploadImageModal from "../../components/Modal/UploadImageModal";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import TextInput from "../../components/Input/InputForm";
import { Button, Container } from "@mui/material";
import { Textarea } from "@mui/joy";
import { UserIcon, EditIcon } from "../../components/icons/iconComponents";

function AccountSettings() {
  const { user, setUser, loadUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [image, setImage] = useState(user.image ? [user.image] : []);
  const [showImageModal, setShowImageModal] = useState(false);

  const guardarCambios = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("lastname", user.lastname);
      formData.append("username", user.username);
      formData.append("email", user.email);
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
        <h2
          className="font-quicksand font-semibold text-lg "
          style={{ fontSize: "45px" }}
        >
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
                label={"Nombre"}
                className="rounded-lg w-72"
                id={"name"}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                value={user.name}
                sx={{
                  background: "rgb(248, 250, 229, 0.9)",
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#FEDB39",
                    height: "7rem",
                  },
                }}
              />
            </div>
            <div className="flex flex-col w-80">
              <TextInput
                type={"text"}
                label={"Email"}
                className="rounded-lg w-72"
                id={"email"}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                value={user.email}
                disabled={true}
                sx={{
                  background: "rgb(248, 250, 229, 0.9)",
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#FEDB39",
                    height: "7rem",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex gap-20 mt-5">
            <div className="flex flex-col w-64">
              <TextInput
                type={"password"}
                label={"Contraseña"}
                className="rounded-lg w-72"
                value={"123456"}
                disabled={true}
                sx={{
                  background: "rgb(248, 250, 229, 0.9)",
                  "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#FEDB39",
                    height: "7rem",
                  },
                }}
              />
            </div>
            <TextInput
              className={"w-36 "}
              id={"age"}
              label={"Edad"}
              type={"number"}
              value={user.age}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, age: e.target.value }))
              }
              sx={{
                background: "rgb(248, 250, 229, 0.9)",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#FEDB39",
                  height: "7rem",
                },
              }}
            />
          </div>
          <div className="mt-5">
            <div className="flex flex-col w-80">
              <Textarea
                id="description"
                maxRows={5}
                variant="solid"
                value={user.description}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe tu evento"
                sx={{
                  "&::before": {
                    display: "none",
                  },
                  "&:focus-within": {
                    outline: "1px solid rgba(33, 42, 62, .6)",
                  },
                }}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "#394867",
                  width: "100%",
                  height: "9rem",
                  fontFamily: "quicksand",
                  fontWeight: "600",
                }}
              />
            </div>
          </div>
          <div className="mt-5">
            <Button
              variant="contained"
              onClick={guardarCambios}
              style={{
                fontSize: "1em",
                fontFamily: "quicksand",
                fontWeight: "600",
                letterSpacing: ".2px",
                wordSpacing: ".2px",
                textTransform: "none",
                borderRadius: ".8rem",
                backgroundColor: "rgba(33, 42, 62, 1)",
              }}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
        <div
          className="ml-20 flex flex-col align-middle content-center relative"
          style={{
            width: "18%",
            maxWidth: "20%",
          }}
        >
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setShowImageModal(true)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "2.9em",
                height: "2.7em",
                borderRadius: "100%",
                backgroundColor: "#394867",
              }}
            >
              <EditIcon sx={{ fontSize: 29 }} />
            </button>
          </div>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "85%",
              height: "55%",
              background: "rgba(155, 164, 181, 0.4)",
              borderRadius: "10rem",
            }}
          >
            {image.length > 0 ? (
              <img
                src={URL.createObjectURL(image[0])}
                width={240}
                style={{
                  height: "220px",
                  maxHeight: "400px",
                  borderRadius: "50%",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserIcon sx={{ fontSize: 112 }} />
            )}
          </Container>

          <div className="flex justify-center items-center mt-8">
            <Button
              className="border border-blue-950 p-2 pl-16 ml-2 pr-16 rounded-lg hover:bg-blue-950 "
              style={{
                width: "50%",
                height: "100%",
                backgroundColor: "rgba(33, 42, 62, 0.2)",
                borderRadius: ".6em",
                textTransform: "none",
                fontFamily: "quicksand",
                color: "rgba(33, 42, 62, 1)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
              onClick={() => {
                setImage([]);
              }}
            >
              Eliminar Foto
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountSettings;
