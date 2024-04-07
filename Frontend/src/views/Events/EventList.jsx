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
const [firstEvent, setFirstEvent] = useState({});
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
  loadEvents();
  }, []);

  const loadEvents = async () => {
  const startTime = Date.now();
  try {
  setIsLoading(true);
  const result = await RequestHelper.get("events/events-user");
  result.map(async (event) => {
  const imageUrls = event.image ? event.image : [];

  if (imageUrls.length > 0) {
  for (const imageUrl of imageUrls) {
  try {
  const blob = await RequestHelper.get(imageUrl, {}, "image");
  event.photo = new File([blob], `image_${result.length}.jpg`, {
                type: "image/jpeg",
              });
            } catch (error) {
  //
            }
          }
        }

        event.date = new Date(event.date).toLocaleString();
        return event;
      });
      setFirstEvent(result.at(0));
      setEvents(result);
    } catch (error) {
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

  const DesinscribirEvento = async () => {
    try {
      await RequestHelper.delete(`events/delete-user`, {
        eventId: firstEvent.id,
      });
      ToastHelper.success("Desinscrito exitosamente");
      loadEvents();
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    }
  };

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
{/* {firstEvent?.photo && (
              <img
                src={firstEvent?.photo ? URL.createObjectURL(firstEvent.photo) : defaultImageUrl}
                alt="Card"
                className="text-black-500 w-60 h-44 object-cover mb-4 rounded-3xl"
              />
            )} */}

            <div className="flex mb-2">
              <h1 
              className="font-quicksand font-semibold mb-3"
              style={{ fontSize: "22px" }}>
                {firstEvent?.title ?? 'No hay eventos próximos'}
              </h1>
{firstEvent?.title && (
                <button
                  style={{ color: "yellow", borderRadius: "50%" }}
                  className="ml-auto bg-black h-10 p-2"
                  onClick={DesinscribirEvento}
                >
                  <Trash2 />
                </button>
              )}
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
          className="flex flex-col columns-6 max-w-screen-xl bg-blue-500 p-8 ml-10 mt-10"
          style={{ 
            width: '75%',
            height: '27rem',
            overflow: 'scroll',
            backgroundColor: "#FCFCFC",
            boxShadow: '1px 0 8px rgba(57, 72, 103, 0.4)'
          }}
        >
          {events && events.length > 0 ? (
            events
              .slice(1)
              .map((card) => (
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
