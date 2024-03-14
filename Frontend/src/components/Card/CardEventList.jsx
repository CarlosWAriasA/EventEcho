import { NavLink } from 'react-router-dom';

const CardEventList  = ({ title, content, imageUrl, time, place }) => {
  // Default image URL
  const defaultImageUrl = '/images/default-image.jpg';

  return (
    <NavLink to={'event-detail'}>
      <div className='flex m-2 p-4 bg-white rounded-lg shadow-md hover:cursor-pointer border border-black-500 p-4'>
        <img
          src={imageUrl || defaultImageUrl}
          alt='Card'
          className='text-black-500 w-40 h-44 object-cover mb-4 rounded-md'
        />
        <div className='flex flex-col ml-6'>
            <h2 className='text-black-500 text-xl font-semibold mb-2'>{title}</h2>
            <p>{content}</p>
            <div className='flex mt-10'>
                <h3 className='mr-40'>{time}</h3> 
                <h3>{place}</h3>
            </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CardEventList;
