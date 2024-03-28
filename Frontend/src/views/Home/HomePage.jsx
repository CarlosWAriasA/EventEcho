import { LayoutGrid } from "lucide-react";
import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const navigate = useNavigate();

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
    sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    setEvents([events[0], ...sortedEvents]);
  };

  const sortByName = () => {
    const sortedEvents = events.slice(1);
    sortedEvents.sort((a, b) => a.name.localeCompare(b.name));
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
        className="flex flex-col items-center"
        style={{ height: "500px", maxHeight: "500px" }}
      >
        {isLoading ? (
          <div style={{ width: "80%", height: "400px", marginTop: "20px" }}>
            <Skeleton height={400} />
          </div>
        ) : (
          <>
            <img
              onClick={() =>
                navigate(
                  `${events.length > 0 ? `event-detail/${events[0].id}` : ""}`
                )
              }
              className="rounded-md mt-5 border-4 border-black hover:cursor-pointer"
              src={
                events.length > 0 && events[0]?.image
                  ? URL.createObjectURL(events[0].image)
                  : "/images/default-image.jpg"
              }
              style={{ width: "80%", height: "400px" }}
              alt="Description of your image"
            />
            <div className="relative bg-blue-950 text-white bottom-9 w-96 text-center rounded-lg p-6 overflow-hidden whitespace-nowrap">
              {events.length > 0 ? events[0]?.name : "Crea el primer evento"}
            </div>
          </>
        )}
      </div>
      <div className="ml-36 mr-36">
        <div className="flex justify-between">
          <h2 className="text-black text-lg">Eventos</h2>
          <div className="flex gap-3">
            <div
              onClick={sortByDate}
              className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white"
            >
              Fecha
              <LayoutGrid size={18} />
            </div>
            <div
              onClick={sortByName}
              className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white"
            >
              Nombre
              <LayoutGrid size={18} />
            </div>
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
