import Card from "../../components/Card/Card";
import { useState, useEffect, useContext } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Container, Button, Icon } from "@mui/material";
import { DownFilterIcon } from "../../components/icons/iconComponents";
import { AuthContext } from "../../context/AuthContext";
import { Ban } from "lucide-react";
import { Typography } from "@mui/material";

export function HomePage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const navigate = useNavigate();
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const isUnLogged = user === null;
  const [firstEvent, setFirstEvent] = useState({});

  const loadEvents = async () => {
    try {
      const loadingState = page === 1 ? setIsLoading : setIsLoadingMore;
      loadingState(true);
      const result = await RequestHelper.get("events", {
        isPageable: true,
        page: page,
        pageSize: pageSize,
      });
      const loadedEvents = result?.map(async (e) => {
        let image;
        const imageUrls = e.image ? e.image : [];

        if (imageUrls.length > 0) {
          try {
            const blob = await RequestHelper.get(imageUrls[0], {}, "image");
            image = new File([blob], `image_.jpg`, {
              type: "image/jpeg",
            });
          } catch (e) {
            console.error(e);
          }
        }

        return {
          id: e.id,
          name: e.title,
          location: e.location,
          amount: `${0}/${e.attendees}`,
          people: e.attendees,
          date: new Date(e.date),
          image: image,
        };
      });
      Promise.all(loadedEvents)
        .then((loadedEvents) => {
          if (page > 1 && loadedEvents.length < 6) {
            setShowMoreButton(false);
          } else if (page == 1 && loadedEvents.length < 6) {
            setShowMoreButton(false);
          }
          if (page === 1) {
            setFirstEvent(loadedEvents[0]);
          }
          setEvents([...(events ?? []), ...loadedEvents]);
        })
        .catch((error) => {
          console.error("Error al obtener eventos:", error);
        });
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      if (page === 1) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setIsLoadingMore(false);
      }
    }
  };
  const sortByDate = () => {
    const sortedEvents = events;
    sortedEvents.sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      return ascendingOrder ? dateComparison : -dateComparison;
    });

    setAscendingOrder(!ascendingOrder);
    setEvents([...sortedEvents]);
  };

  const sortByName = () => {
    const sortedEvents = events;
    sortedEvents.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);
      return ascendingOrder ? nameComparison : -nameComparison;
    });

    setAscendingOrder(!ascendingOrder);
    setEvents([...sortedEvents]);
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };

  const handleClick = () => {
    ToastHelper.warning(
      <Typography className="font-quicksand font-medium">
        Por favor, iniciar sesión
      </Typography>
    );
  };

  useEffect(() => {
    loadEvents();
  }, [page, pageSize]);

  return (
    <>
      <div
        className={`bg-white h-full overflow-y-auto text-black pb-36 ${
          isUnLogged ? "select-none" : ""
        }`}
        onClick={isUnLogged ? handleClick : () => {}}
      >
        {isUnLogged && (
          <div
            className="absolute bottom-0 w-full h-1/2 bg-black flex items-center justify-center"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Ban
              size={50}
              color="#f0ad4e"
              className="text-gray-500 mb-10 bg-blue-900 p-2 absolute"
              style={{ zIndex: 1000, top: -25, borderRadius: "50%" }}
            />
          </div>
        )}
        <div
          className="flex flex-col items-center cursor-default"
          style={{ height: "500px", maxHeight: "500px" }}
        >
          {isLoading ? (
            <div style={{ width: "80%", height: "400px", marginTop: "20px" }}>
              <Skeleton height={400} />
            </div>
          ) : (
            <>
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90%",
                  width: "90%",
                }}
              >
                <Icon
                  sx={{
                    display: "inherit",
                    justifyContent: "inherit",
                    alignItems: "inherit",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    onClick={() =>
                      navigate(
                        `${
                          firstEvent?.id ? `event-detail/${firstEvent?.id}` : ""
                        }`
                      )
                    }
                    className="rounded-lg mt-5 hover:cursor-pointer"
                    src={
                      firstEvent?.image
                        ? URL.createObjectURL(firstEvent?.image)
                        : "/icons/emptyIllustration.svg"
                    }
                    style={{ width: "90%", height: "90%", margin: "0" }}
                    alt="Description of your image"
                  />
                </Icon>
              </Container>
              <Container
                className="text-white bottom-9 text-center p-6 overflow-hidden whitespace-nowrap"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 350,
                  backgroundColor: "#212A3E",
                  boxShadow: "2px 1px 5px rgba(33, 42, 62, .5)",
                  borderRadius: "1.5em",
                }}
              >
                {firstEvent?.name ? (
                  firstEvent?.name
                ) : (
                  <p className="font-quicksand font-medium text-xl tracking-wide">
                    Sé el primer evento
                  </p>
                )}
              </Container>
            </>
          )}
        </div>
        <div className="ml-36 mr-36 mt-8">
          <div className="flex justify-between">
            <h2
              className="font-quicksand font-medium text-2xl"
              style={{ color: "#212A3E" }}
            >
              Eventos
            </h2>
            <div className="flex gap-3">
              <Button
                onClick={isUnLogged ? () => {} : sortByDate}
                variant="contained"
                style={{
                  borderRadius: ".7em",
                  width: "5.7rem",
                  height: "2.6rem",
                  fontFamily: "quicksand",
                  fontWeight: 600,
                  backgroundColor: isUnLogged
                    ? "transparent"
                    : "rgba(252, 252, 252, 0.8)",
                  color: "#394867",
                  textTransform: "none",
                }}
                disabled={isUnLogged}
                endIcon={<DownFilterIcon sx={{ fontSize: 24 }} />}
              >
                Fecha
              </Button>
              <Button
                onClick={isUnLogged ? () => {} : sortByName}
                variant="contained"
                style={{
                  borderRadius: ".7em",
                  width: "6.2rem",
                  height: "2.6rem",
                  fontFamily: "quicksand",
                  fontWeight: 600,
                  backgroundColor: isUnLogged
                    ? "transparent"
                    : "rgba(252, 252, 252, 0.8)",
                  color: "#394867",
                  textTransform: "none",
                }}
                disabled={isUnLogged}
                endIcon={<DownFilterIcon sx={{ fontSize: 24 }} />}
              >
                Nombre
              </Button>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 mr-10 ml-10">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} loading />
              ))
            ) : (
              <>
                {events.map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    title={card.name}
                    content={card.location}
                    image={card.image && URL.createObjectURL(card.image)}
                  />
                ))}
              </>
            )}
            {isLoadingMore &&
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} loading />
              ))}
          </div>
          {showMoreButton && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                className="bg-yellow-400 text-white py-2 px-4 rounded-md"
                onClick={isUnLogged ? () => {} : handleShowMore}
                disabled={isLoadingMore || isUnLogged}
              >
                Mostrar Mas
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
