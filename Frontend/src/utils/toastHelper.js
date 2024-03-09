import { toast } from "react-toastify";

const ToastHelper = {
  error: (message, position = "top-center") => {
    toast.dismiss();
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type: "error",
    });
  },

  success: (message, position = "top-center") => {
    toast.dismiss();
    toast(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type: "success",
    });
  },
};

export default ToastHelper;
