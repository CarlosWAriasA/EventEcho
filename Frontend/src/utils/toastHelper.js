import { toast } from "react-toastify";

const ToastHelper = {
  error: (message, position = "bottom-right") => {
    toast.dismiss();
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
    });
  },

  success: (message, position = "bottom-right") => {
    toast.dismiss();
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      type: "success",
    });
  },
};

export default ToastHelper;
