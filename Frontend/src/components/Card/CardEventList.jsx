import { NavLink } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from '@mui/icons-material/Delete';
import ToastHelper from "../../utils/toastHelper";
import { Card as CardFlowbite } from "flowbite-react/lib/esm";
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
      //<NavLink to={`event-detail/${id}`}>
        <CardFlowbite>
        <div className="flex h-40">
          <img
            src={imageUrl || defaultImageUrl}
            alt="Card"
            className="text-black-500 w-60 h-44 object-cover mb-4 rounded-3xl"
          />
          <div className="flex-columns ml-10">
            <h5 className="mb-5">{title.length > 40 ? `${title.substring(0, 40)}...` : title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {content.length > 78 ? `${content.substring(0, 78)}...` : content}
            </p>
          </div>
          <button style={{color: 'yellow'}} className="ml-auto bg-black h-10 rounded-3xl" onClick={DesinscribirEvento}>
            <DeleteIcon/>
          </button>
        </div>  
          <div className="flex ml-5 w-full justify-center">
            <AccessTimeIcon sx={{ color: "yellow", fontSize: "20px" }} />
            <h3 className="mr-35 ml-2 w-60">{time}</h3>
            <LocationOnOutlinedIcon sx={{ color: "yellow", fontSize: "20px" }}/>
                <h3 className="mr-35 ml-2 w-60">
                  <h3>{place}</h3>
                </h3>
          </div>
        </CardFlowbite>
      //</NavLink>
    );
};

export default CardEventList;
