import { toast } from "react-toastify";

const ToastHelper = {
  error: (message) => {
    toast.dismiss();
    toast(message, {
      position: "top-center",
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

  success: (message) => {
    toast.dismiss();
    toast(message, {
      position: "top-center",
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
