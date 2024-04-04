import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Trash2 } from "lucide-react";
import ToastHelper from "../../utils/toastHelper";
import { Card as CardFlowbite } from "flowbite-react/lib/esm";
import RequestHelper from "../../utils/requestHelper";

const CardEventList = ({
  id,
  title,
  content,
  imageUrl,
  time,
  place,
  onLoadEvents,
}) => {
  const DesinscribirEvento = async () => {
    try {
      await RequestHelper.delete(`events/delete-user`, {
        eventId: id,
      });
      ToastHelper.success("Desinscrito exitosamente");
      onLoadEvents();
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    }
  };

  // Default image URL
  const defaultImageUrl = "/images/default-image.jpg";

  return (
    <CardFlowbite className="border-3 border-gray-300 rounded-3xl">
      <div className="flex h-40">
          <img
            src={imageUrl || defaultImageUrl}
            alt="Card"
            className="text-black-500 w-60 h-44 object-cover mb-4 rounded-3xl"
          />
          <div className="flex-columns ml-10">
            <h4 className="mb-5">{title.length > 40 ? `${title.substring(0, 40)}...` : title}</h4>
            <h5 className="font-normal text-gray-700 dark:text-gray-400">
              {content.length > 78 ? `${content.substring(0, 78)}...` : content}
            </h5>
          </div>
          <button style={{ color: "yellow", borderRadius: "50%" }} className="ml-auto bg-black h-10 p-2" onClick={DesinscribirEvento}>
            <Trash2 />
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
