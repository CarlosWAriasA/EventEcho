import { NavLink } from "react-router-dom";

const Card = ({ id, title, content, image }) => {
  // Default image URL
  const defaultImageUrl = "/images/default-image.jpg";

  return (
    <NavLink to={`event-detail/${id}`}>
      <div className="m-2 p-4 bg-white rounded-lg shadow-md hover:cursor-pointer">
        <img
          src={image ?? defaultImageUrl}
          alt="Card"
          className="w-full h-44 object-cover mb-4 rounded-md"
        />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p>{content}</p>
      </div>
    </NavLink>
  );
};

export default Card;
