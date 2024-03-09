import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { router as authRouter } from "./routes/AuthRoutes.jsx";
import { router as appRouter } from "./routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { userToken } = useContext(AuthContext);

  return (
    <div className="text-white flex justify-center items-center bg-cover">
      <RouterProvider
        router={
          userToken !== null && userToken !== "null" ? appRouter : authRouter
        }
      />
      <ToastContainer />
    </div>
  );
}

export default App;
