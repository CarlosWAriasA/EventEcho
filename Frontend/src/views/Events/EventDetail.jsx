import { Clock, MapPin, UserRound } from "lucide-react";

function EventDetail() {
  const defaultImageUrl = "/images/default-image.jpg";
  return (
    <main className="bg-white h-full pl-16 pt-16 text-black">
      <div className="flex gap-6">
        <img
          src={defaultImageUrl}
          alt="Card"
          className="object-cover mb-4"
          style={{ width: "50%", maxHeight: "25em", height: "25em" }}
        />
        <div>
          <h2
            style={{
              fontSize: "4em",
              paddingBottom: "5px",
              paddingTop: "-5px",
            }}
          >
            Lorem Ipsum
          </h2>
          <div className="flex gap-2">
            <MapPin
              className="hover:cursor-pointer select-none"
              color="white"
              fill="yellow"
              size={35}
            />
            <p className="text-gray-400 m-0 pt-1">Lorem Ipsum</p>
          </div>
          <div className="flex gap-2 mt-3">
            <Clock
              className="hover:cursor-pointer select-none"
              color="white"
              size={35}
              fill="yellow"
            />
            <p className="text-gray-400 m-0 pt-1">Lorem Ipsum</p>
          </div>
          <div className="flex gap-2 mt-4 ml-1">
            <div className="flex">
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{ zIndex: 1, borderRadius: "50%", padding: "2px" }}
              />
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  marginLeft: "-10px",
                  zIndex: 2,
                }}
              />
              <UserRound
                className="hover:cursor-pointer select-none bg-gray-400"
                size={25}
                style={{
                  borderRadius: "50%",
                  padding: "2px",
                  marginLeft: "-10px",
                  zIndex: 3,
                }}
              />
            </div>
            <p className="m-0">+22</p>
          </div>
          <p className="m-0 pt-3" style={{ fontSize: "2em" }}>
            Lorem Ipsum
          </p>
        </div>
      </div>
      <div style={{ fontSize: "3em" }}>Lorem Ipsum</div>
      <div style={{ fontSize: "1em" }}>Lorem Ipsum</div>
    </main>
  );
}

export default EventDetail;