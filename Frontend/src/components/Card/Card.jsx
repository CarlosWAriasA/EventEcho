import { NavLink } from "react-router-dom";
import { Card as CardFlowbite } from "flowbite-react/lib/esm";

const Card = ({ id, title, content, image }) => {
  // Default image URL
  const defaultImageUrl = "/images/default-image.jpg";

  return (
    <NavLink to={`event-detail/${id}`}>
      <CardFlowbite
        renderImage={() => (
          <img
            className="w-full object-cover mb-4 rounded-md"
            src={image ?? defaultImageUrl}
            alt="card"
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
