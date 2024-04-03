import { blue } from "@mui/material/colors";
import { color } from "@mui/system";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Card from "../../components/Card/CardEventList";
import CardEventList from "../../components/Card/CardEventList";
import { forwardRef, useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { NavLink, useNavigate } from "react-router-dom";
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";
import { Skeleton, Icon, Container, Typography } from "@mui/material";
import { LocationIcon, TimeIcon } from "../../components/icons/iconComponents";

const EventList = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isRegister, setIsRegister] = useState(false);


  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const startTime = Date.now();
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("events/events-user");
      const formatData = result.map(async (event) => {
        const imageUrls = event.image ? event.image : [];

        if (imageUrls.length > 0) {
          for (const imageUrl of imageUrls) {
            try {
              const blob = await RequestHelper.get(imageUrl, "image");
              console.log(blob);
              event.photo = new File([blob], `image_${images.length}.jpg`, {
                type: "image/jpeg",
              });
              images.push(
                new File([blob], `image_${images.length}.jpg`, {
                  type: "image/jpeg",
                })
              );
            } catch (error) {
              console.log(error);
            }
          }
          console.log(images);
          setImages(images);
        }

        return event;
      });
      console.log(result);
      setEvents(result);
    } catch (error) {
      console.log(error);
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      const remainingTime = 500 - (Date.now() - startTime);
      if (remainingTime > 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        setIsLoading(false);
      }
    }
  };


  // const EventsData = [
  //   {
  //     id: 1,
  //     title: "Fiesta en la Plaza",
  //     content: "Acompañanos en nuestra fiesta",
  //     time: "6:30",
  //     place: "Plaza de la Bandera",
  //   },
  //   {
  //     id: 2,
  //     title: "Aventura deportiva colectiva",
  //     content: "Aconpañanos en esta aventura deportiva",
  //     time: "8:30",
  //     place: "Centro Olimpico",
  //   },
  //   {
  //     id: 3,
  //     title: "Conocedores de Historia",
  //     content: "En la misma conoceremos la historia del faro",
  //     time: "6:30",
  //     place: "El faro a Colon",
  //   },
  //   {
  //     id: 4,
  //     title: "Aventureros por la ciudad",
  //     content: "Aventura por la Nuñez de Caceres",
  //     time: "6:30",
  //     place: "La nuñez de Caceres",
  //   },
  // ];

  return (
    <main
      className="bg-white text-black h-full overflow-y-auto"
      style={{ backgroundColor: "#D8E1EE" }}
    >
      <div className="flex justify-inline flex-col">
        <div className="flex">
          <div
            className="flex flex-col columns-6  w-3/4 bg-blue-500 p-8 rounded-3xl ml-10 mt-10 text-white"
            style={{ backgroundColor: "#394867" }}
          >
            <div className="flex mb-2">
              <h1 
              className="font-quicksand font-semibold mb-3"
              style={{ fontSize: "22px" }}>
                No hay eventos próximos
              </h1>
            </div>
            <div className="flex mb-2 items-center pb-3">
              <h3 className="pr-2">
                <LocationIcon 
                sx={{ 
                  fontSize: 24

                }}
                />
              </h3>
              <Skeleton variant="rounded" width={130} height={15}/>
            </div>
            <div className="flex mb-2 items-center">
              <h3 className="pr-2">
                <TimeIcon
                  sx={{
                    fontSize: 24 
                  }}

                />
              </h3>
              <Skeleton variant="rounded" width={100} height={15}/>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col  columns-6 max-w-screen-xl w-3/4 h-96 bg-blue-500 p-8 ml-10 mt-10"
          style={{ 
            backgroundColor: "#FCFCFC",
            boxShadow: '1px 0 8px rgba(57, 72, 103, 0.4)'
          }}
        >
          {events && events.length > 0 ? (
            events.map((card) => (
              <Card
                id={card.id}
                key={card.id}
                title={card.title}
                imageUrl={card.photo && URL.createObjectURL(card.photo)}
                content={card.description}
                place={card.location}
                time={card.date}
                onLoadEvents={loadEvents}
              ></Card>
            ))
          ) : (
            // <h1 className="">No tiene ningun evento inscrito.</h1>
            <Container sx={{ display: "grid", justifyItems: 'center', alignItems:'content'}} className="w-full h-full">
              <Icon
              sx={{display:'flex', justifyContent:"center", alignSelf: 'end', marginBottom: 3, width: "80%", height: '80%'}}
             >
              <img style={{width: '40%', maxWidth: '50%'}} src="../../../public/icons/aloneIllustration.svg"/>
              </Icon>
              <Typography variant='h6' sx={{ fontFamily: 'quicksand', fontWeight: '600'}}>¡Vaya! No hay ningún evento</Typography>
            </Container>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventList;
