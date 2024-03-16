import { LayoutGrid } from "lucide-react";
import Card from "../../components/Card/Card";
import { LoadingContext } from "../../context/LoadingContext";
import { useContext, useState, useEffect } from "react";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";

export function HomePage() {
  const { setIsLoading } = useContext(LoadingContext);
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const result = await RequestHelper.get("events");
      const events = result?.map((e) => ({
        id: e.id,
        name: e.title,
        location: e.location,
        amount: `${0}/${e.attendees}`,
        people: e.attendees,
        date: new Date(e.date).toLocaleDateString(),
      }));
      setEvents(events);
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="bg-white h-full overflow-y-auto text-black">
      <div
        className="flex flex-col items-center"
        style={{ height: "500px", maxHeight: "500px" }}
      >
        <img
          className="rounded-md mt-5"
          src="/images/default-image.jpg"
          style={{ width: "80%", height: "400px" }}
          alt="Description of your image"
        />
        <div className="relative bg-blue-950 text-white bottom-9 w-96 text-center rounded-lg p-6">
          Evento random
        </div>
      </div>
      <div className="ml-36 mr-36">
        <div className="flex justify-between">
          <h2 className="text-black text-lg">Eventos</h2>
          <div className="flex gap-3">
            <div className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white">
              ordernar1
              <LayoutGrid size={18} />
            </div>
            <div className="flex items-center bg-gray-400 p-2 rounded-md gap-2 hover:cursor-pointer hover:text-white">
              ordernar2
              <LayoutGrid size={18} />
            </div>
          </div>
        </div>
        <div className="mt-10 mb-36 grid grid-cols-3 gap-4 mr-10 ml-10">
          {events.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.name}
              content={card.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
