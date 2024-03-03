import { LayoutGrid } from "lucide-react";
import Card from "../../components/Card/Card";

export function HomePage() {
  const cardData = [
    { id: 1, title: "Card 1", content: "Content for card 1" },
    { id: 2, title: "Card 2", content: "Content for card 2" },
    { id: 3, title: "Card 3", content: "Content for card 3" },
    { id: 4, title: "Card 4", content: "Content for card 4" },
    { id: 5, title: "Card 5", content: "Content for card 5" },
    { id: 6, title: "Card 6", content: "Content for card 6" },
  ];

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
          {cardData.map((card) => (
            <Card key={card.id} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
