import { NavLink } from "react-router-dom";
import { Card as CardFlowbite } from "flowbite-react/lib/esm";

const Card = ({ id, title, content, image, loading = false }) => {
  // Default image URL
  const defaultImageUrl = "/images/default-image.jpg";

  if (loading) {
    // Si la tarjeta está en modo de carga, muestra una tarjeta de carga
    return (
      <CardFlowbite>
        <div className="animate-pulse">
          <div className="w-full h-36 mb-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 mb-2 bg-gray-200 rounded-md"></div>
          <div className="h-4 mb-2 bg-gray-200 rounded-md"></div>
          <div className="h-4 mb-2 bg-gray-200 rounded-md"></div>
        </div>
      </CardFlowbite>
    );
  }

  return (
    <NavLink to={`event-detail/${id}`}>
      <CardFlowbite
        renderImage={() => (
          <img
            className="w-full object-cover mb-4 rounded-md border-2 border-black"
            src={image ?? defaultImageUrl}
            alt="card"
            style={{ maxHeight: 220 }}
          />
        )}
      >
        <h5>{title.length > 40 ? `${title.substring(0, 40)}...` : title}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {content.length > 78 ? `${content.substring(0, 78)}...` : content}
        </p>
      </CardFlowbite>
    </NavLink>
  );
};

export default Card;
