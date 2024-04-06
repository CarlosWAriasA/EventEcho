import { RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { router as authRouter } from "./routes/AuthRoutes.jsx";
import { router as appRouter } from "./routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import Loading from "./components/Loading/Loading.jsx";
import "leaflet/dist/leaflet.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

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
