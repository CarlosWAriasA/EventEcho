import { RouterProvider } from "react-router-dom";
import { router } from './Router.jsx'
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  // const { userToken } = useContext(AuthContext);
  return (
    <div className="text-white flex justify-center items-center bg-cover">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
