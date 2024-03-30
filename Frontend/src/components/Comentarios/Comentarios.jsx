import { CircleUserRound } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import TextInput from "../Input/InputForm";
import { Button } from "flowbite-react";
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";

function Comentarios({ eventId }) {
  const { user } = useContext(AuthContext);
  const [comentario, setComentario] = useState({
    userId: "",
    eventId: "",
    description: "",
  });
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    if (eventId > 0) {
      obtenerComentarios();
    }
  }, [eventId]);

  const validarComentario = () => {
    if (!comentario.description) {
      ToastHelper.warning("La descripción es requerida");
      return false;
    }

    if (comentario.description.length > 600) {
      ToastHelper.warning(
        "La descripción exceda el maximo de caracteres permitidos"
      );
      return false;
    }

    return true;
  };

  const obtenerComentarios = async () => {
    try {
      const result = await RequestHelper.get("comentarios", {
        eventId: eventId,
      });
      const formatResult = result.map(async (coment) => {
        if (coment.Usuario.profileImage) {
          try {
            const blob = await RequestHelper.get(
              coment.Usuario.profileImage,
              {},
              "image"
            );
            coment.userImage = new File([blob], `image_user.jpg`, {
              type: "image/jpeg",
            });
          } catch (error) {
            //
          }
        }
        coment.date = new Date(coment.date).toLocaleString();
        return coment;
      });
      Promise.all(formatResult)
        .then((formatResult) => {
          setComentarios(
            formatResult.sort((a, b) => new Date(b.date) - new Date(a.date))
          );
        })
        .catch((error) => {
          console.error("Error al obtener comentarios:", error);
        });
    } catch (error) {
      ToastHelper.warning(error.message);
    }
  };

  const limpiarComentario = () => {
    setComentario({
      userId: "",
      eventId: "",
      description: "",
    });
  };

  const addComentario = async () => {
    try {
      if (validarComentario()) {
        await RequestHelper.post("comentarios", {
          userId: user.id,
          eventId: eventId,
          description: comentario.description,
        });
        ToastHelper.success("Comentario creado exitosamente");
        limpiarComentario();
        obtenerComentarios();
      }
    } catch (error) {
      ToastHelper.warning(error.message);
    }
  };

  return (
    <section className="pb-10 w-full">
      <div className="mb-2 mt-5" style={{ fontSize: "2em" }}>
        Comentarios
      </div>
      <div
        className="overflow-auto p-8 "
        style={{ height: "32em", backgroundColor: "#394867" }}
      >
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            {user.image ? (
              <img
                src={URL.createObjectURL(user.image)}
                alt="Profile"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            ) : (
              <CircleUserRound
                className="hover:cursor-pointer bg-gray-300 p-1"
                color="black"
                style={{ borderRadius: "50%" }}
                size={45}
              />
            )}
            <p className="text-xl text-white">{user.name}</p>
          </div>
          <div>
            <div>
              <TextInput
                className="rounded-lg bg-white w-full"
                label={"Descripción"}
                value={comentario.description}
                onChange={(e) =>
                  setComentario((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                multiline
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-2 w-24 select-none"
                gradientDuoTone="redToYellow"
                outline
                onClick={addComentario}
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-0">
          {comentarios.map((comment) => {
            return (
              <>
                <div
                  key={comment.id}
                  className="border-black border-2 p-2 rounded-md break-words"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 mb-2">
                      {comment.userImage ? (
                        <img
                          src={URL.createObjectURL(comment.userImage)}
                          alt="Profile"
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <CircleUserRound
                          className="hover:cursor-pointer bg-gray-300 p-1"
                          color="black"
                          style={{ borderRadius: "50%" }}
                          size={45}
                        />
                      )}
                      <p className="text-xl text-white">
                        {comment.Usuario.name}
                      </p>
                    </div>
                    <p className="text-white">{comment.date}</p>
                  </div>
                  <p className="text-white text-justify ml-2 mr-4">
                    {comment.description.length > 600
                      ? `${comment.description.substring(0, 600)}...`
                      : comment.description}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Comentarios;
