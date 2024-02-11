import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router as authRouter } from "./routes/AuthRoutes.jsx";
import { router as appRouter } from "./routes/AppRoutes.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { userToken } = useContext(AuthContext);
  return (
    <div className="text-white flex justify-center items-center bg-cover">
      <RouterProvider router={userToken !== null ? appRouter : authRouter} />
    </div>
  );
}

export default App;
