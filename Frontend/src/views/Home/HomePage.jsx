import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Container, Button, Icon } from "@mui/material";
import { DownFilterIcon } from "../../components/icons/iconComponents";

export function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const navigate = useNavigate();
  const [ascendingOrder, setAscendingOrder] = useState(true);

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
    const sortedEvents = events.slice(1);
    sortedEvents.sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      return ascendingOrder ? dateComparison : -dateComparison;
    });

    setAscendingOrder(!ascendingOrder);
    setEvents([events[0], ...sortedEvents]);
  };

  const sortByName = () => {
    const sortedEvents = events.slice(1);
    sortedEvents.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);
      return ascendingOrder ? nameComparison : -nameComparison;
    });

    setAscendingOrder(!ascendingOrder); // Invertir el indicador de orden
    setEvents([events[0], ...sortedEvents]);
  };

  const handleShowMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    loadEvents();
  }, [page, pageSize]);

  return (
    <div className="bg-white h-full overflow-y-auto text-black pb-36">
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
                padding: "3rem",
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
                        events.length > 0 ? `event-detail/${events[0].id}` : ""
                      }`
                    )
                  }
                  className="rounded-lg mt-5 hover:cursor-pointer"
                  src={
                    events.length > 0 && events[0]?.image
                      ? URL.createObjectURL(events[0].image)
                      : "/icons/emptyIllustration.svg"
                  }
                  style={{ width: "90%", height: "90%", margin: "0" }}
                  alt="Description of your image"
                />
              </Icon>
            </Container>
            <Container
              className="relative text-white bottom-9 text-center p-6 overflow-hidden whitespace-nowrap"
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
              {events.length > 0 ? (
                events[0]?.name
              ) : (
                <p className="font-quicksand font-medium text-xl tracking-wide">
                  Sé el primer evento
                </p>
              )}
            </Container>
          </>
        )}
      </div>
      <div className="ml-36 mr-36">
        <div className="flex justify-between">
          <h2
            className="font-quicksand font-medium text-2xl"
            style={{ color: "#212A3E" }}
          >
            Eventos
          </h2>
          <div className="flex gap-3">
            <Button
              onClick={sortByDate}
              variant="contained"
              style={{
                borderRadius: ".7em",
                width: "5.7rem",
                height: "2.6rem",
                fontFamily: "quicksand",
                fontWeight: 600,
                backgroundColor: "rgba(252, 252, 252, 0.8)",
                color: "#394867",
                textTransform: "none",
              }}
              endIcon={<DownFilterIcon sx={{ fontSize: 24 }} />}
            >
              Fecha
            </Button>
            <Button
              onClick={sortByName}
              variant="contained"
              style={{
                borderRadius: ".7em",
                width: "6.2rem",
                height: "2.6rem",
                fontFamily: "quicksand",
                fontWeight: 600,
                backgroundColor: "rgba(252, 252, 252, 0.8)",
                color: "#394867",
                textTransform: "none",
              }}
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
              onClick={handleShowMore}
              disabled={isLoadingMore}
            >
              Mostrar Mas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
