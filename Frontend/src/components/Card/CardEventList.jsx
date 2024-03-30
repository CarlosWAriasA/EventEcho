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
    <CardFlowbite>
      <div className="flex h-40">
        <img
          src={imageUrl || defaultImageUrl}
          alt="Card"
          className="text-black-500 w-60 h-44 object-cover mb-4 rounded-3xl"
        />
        <div>
          <div className="flex">
            <div className="flex-columns ml-10">
              <h3 className="mb-3 text-large">
                {title.length > 40 ? `${title.substring(0, 40)}...` : title}
              </h3>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {content.length > 78
                  ? `${content.substring(0, 180)}...`
                  : content}
              </p>
            </div>
            <button
              style={{ color: "yellow", borderRadius: "50%" }}
              className="ml-auto bg-black h-10 p-2"
              onClick={DesinscribirEvento}
            >
              <Trash2 />
            </button>
          </div>
          <div
            className={`flex ml-8 justify-center gap-2 ${
              content ? "mt-8" : "mt-16"
            }`}
          >
            <div className="flex w-1/2 items-center">
              <AccessTimeIcon sx={{ color: "yellow", fontSize: 30 }} />
              <p className="ml-2">{new Date(time).toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <LocationOnOutlinedIcon
                className=""
                sx={{ color: "yellow", fontSize: 30 }}
              />
              <p>{place}</p>
            </div>
          </div>
        </div>
      </div>
    </CardFlowbite>
  );
};

export default CardEventList;
