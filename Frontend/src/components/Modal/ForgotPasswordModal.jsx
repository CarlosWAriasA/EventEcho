import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextInput from "../Input/InputForm";
import ButtonForm from "../Button/ButtonForm";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#212121",
  boxShadow: 24,
  p: 4,
  outline: "none",
  border: "none",
};

export default function ForgotPasswordModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);

  const sendEmail = async () => {
    setIsLoading(true);
    setIsFetching(true);
    try {
      if (!email) {
        ToastHelper.warning("El Correo Electronico es requerido.");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        ToastHelper.warning("El Correo Electronico es invalido.");
        return false;
      }

      const result = await RequestHelper.post("forgot-password", {
        email: email,
      });

      setOpen(false);
      ToastHelper.success(result.message);
    } catch (error) {
      ToastHelper.warning(error.message);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" className="text-white mb-3 text-xl">
            Ingresa Tu Correo Electrónico
          </div>
          <TextInput
            id={"email"}
            type={"email"}
            className="rounded-lg w-full"
            label={"Correo Electrónico"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{
              background: "rgb(248, 250, 229, 0.9)",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FEDB39",
                height: "5rem",
                borderRadius: "0 0 10px 10px",
              },
            }}
          />
          <Box
            className="gap-4"
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <ButtonForm
              onClick={handleClose}
              label={
                <p className="font-quicksand font-semibold tracking-normal">
                  Cancelar
                </p>
              }
              className={"h-10 justify-center py-0 w-1/2 rounded-lg"}
              style={{ backgroundColor: "#b71c1c", color: "white" }}
            >
              Enviar
            </ButtonForm>
            <ButtonForm
              onClick={isFetching ? () => {} : sendEmail}
              label={
                <p className="font-quicksand font-semibold tracking-normal">
                  Enviar
                </p>
              }
              className={"h-10 justify-center py-0 w-1/2 rounded-lg"}
              style={{ backgroundColor: "#FEDB39", color: "#212A3E" }}
            >
              Enviar
            </ButtonForm>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
