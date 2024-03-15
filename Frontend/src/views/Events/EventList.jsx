import { blue } from '@mui/material/colors';
import { color } from '@mui/system';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from '../../components/Card/CardEventList';
import CardEventList from '../../components/Card/CardEventList';

const EventList = () => {
  const EventsData = [
    {
      id: 1,
      title: 'Fiesta en la Plaza',
      content: 'Acompañanos en nuestra fiesta',
      time: '6:30',
      place: 'Plaza de la Bandera',
    },
    {
      id: 2,
      title: 'Aventura deportiva colectiva',
      content: 'Aconpañanos en esta aventura deportiva',
      time: '8:30',
      place: 'Centro Olimpico',
    },
    {
      id: 3,
      title: 'Conocedores de Historia',
      content: 'En la misma conoceremos la historia del faro',
      time: '6:30',
      place: 'El faro a Colon',
    },
    {
      id: 4,
      title: 'Aventureros por la ciudad',
      content: 'Aventura por la Nuñez de Caceres',
      time: '6:30',
      place: 'La nuñez de Caceres',
    },
  ];

  return (
    <main
      className='bg-white text-black'
      style={{ backgroundColor: '#D8E1EE' }}
    >
      <div className='flex justify-inline flex-col'>
        <div className='flex'>
          <div
            className='flex flex-col columns-6  w-3/4 bg-blue-500 p-8 rounded-3xl ml-10 mt-10 text-white'
            style={{ backgroundColor: '#394867' }}
          >
            <div className='flex mb-2'>
              <h1 style={{ fontSize: '22px' }}>
                Hora de Salir a comer con Chanchito
              </h1>
            </div>
            <div className='flex mb-2'>
              <h3 className='pr-2'>
                <LocationOnOutlinedIcon
                  sx={{ color: 'yellow', fontSize: '20px' }}
                />
              </h3>
              <h3>Santo Domingo, Naco</h3>{' '}
            </div>
            <div className='flex mb-2'>
              <h3 className='pr-2'>
                <AccessTimeIcon sx={{ color: 'yellow', fontSize: '20px' }} />
              </h3>
              <h3>07:30 PM</h3>
            </div>
          </div>
        </div>

        <div
          className='flex flex-col columns-6 max-w-screen-xl w-3/4 bg-blue-500 p-8 ml-10 mt-10'
          style={{ backgroundColor: '#FCFCFC' }}
        >
          {EventsData.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              content={card.content}
              place={card.place}
              time={card.time}
            ></Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EventList;
