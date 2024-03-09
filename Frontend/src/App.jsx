import { RouterProvider } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { router as authRouter } from "./routes/AuthRoutes.jsx";
import { router as appRouter } from "./routes/AppRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import Loading from "./components/Loading/Loading.jsx";

function App() {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // este useEffect es para que cuando el usuario refresque la pagina
  // y este logueado no se vea el login por un milisegundo
  useEffect(() => {
    const handleload = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleload);

    return () => {
      window.removeEventListener("load", handleload);
    };
  }, []);

  if (loading) {
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
