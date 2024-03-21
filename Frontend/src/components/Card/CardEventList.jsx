import { NavLink } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from '@mui/icons-material/Delete';
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";


const CardEventList = ({id, title, content, imageUrl, time, place, onLoadEvents }) => {

  const DesinscribirEvento = async () => {
    try {
        await RequestHelper.delete(`events/delete-user`, {
          eventId: id,
        });
        ToastHelper.success("Desinscrito exitosamente");
        onLoadEvents();
    } catch (error) {
      console.log(error)
      ToastHelper.error("Ha ocurrido un error");
    }
  };

  // Default image URL
  const defaultImageUrl = "/images/default-image.jpg";

  return (
    //<NavLink to={`event-detail/${id}}`}>
      <div className="flex m-2 p-4 bg-white shadow-md hover:cursor-pointer border-2 border-gray-400 rounded-3xl">
        <img
          src={imageUrl || defaultImageUrl}
          alt="Card"
          className="text-black-500 w-60 h-44 object-cover mb-4 rounded-3xl"
        />
        <div className="flex flex-col ml-6">
          <div className="flex">
            <h2 className="text-black-500 text-xl font-semibold mb-2">
              {title}
            </h2>
            <button className="ml-auto" onClick={DesinscribirEvento}>
               <DeleteIcon/>
            </button>
          </div>
          <p>{content}</p>
          <div className="flex">
            <div className="flex mt-20">
              <AccessTimeIcon sx={{ color: "yellow", fontSize: "20px" }} />
              <h3 className="mr-35 ml-2 w-60">{time}</h3>
            </div>
            <div className="flex mt-20">
              <LocationOnOutlinedIcon
                sx={{ color: "yellow", fontSize: "20px" }}
              />
              <h3 className="mr-35 ml-2 w-60">
                <h3>{place}</h3>
              </h3>
            </div>
          </div>
        </div>
      </div>
    //</NavLink>
  );
};

export default CardEventList;
