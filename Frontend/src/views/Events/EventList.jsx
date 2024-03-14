import { blue } from "@mui/material/colors"
import { color } from "@mui/system"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from '../../components/Card/CardEventList';

const EventList = () => {
    return (
     <main className="bg-white text-black" style={{backgroundColor: '#9BA4B5'}}>
      <div className='flex justify-inline flex-col'>
        <div
          className='flex flex-col columns-6 max-w-screen-xl w-3/4 bg-blue-500 p-8 rounded-lg ml-10 mt-10 text-white'
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

        <div
          className='flex flex-col columns-6 max-w-screen-xl w-3/4 bg-blue-500 p-8 ml-10 mt-10'
          style={{ backgroundColor: '#FCFCFC' }}
        >
          <Card 
            title={'La danza espacial del chanchito feliz'}
            content={'ven a ver el famoso baile de Chanchito feliz'}
            time={'8:00'}
            place={'Zona Colonial'}
            
          />
          <Card
            title={'Fiesta Loca con Chanchito'}
            content={'Acompañanos a comer sushi y calamar para celebrar la'}
            time={'6:30'}
            place={'El Malecon'}
          />
          <Card
            title={'Fiesta en la plya con chanchito'}
            content={'Acompañanos  en la playa para disfutar del baile de chanchito'}
            time={'10:00'}
            place={'Plaza de la Bandera'}
          />
        </div>
      </div>
     </main>
    );
}

export default EventList

