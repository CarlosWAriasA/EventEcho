import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";

function Mapa({ value, setValue, onClick = () => {} }) {
  const [zoomed, setZoomed] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (value && !zoomed && mapRef) {
      mapRef.current.flyTo(value, 14);
      setZoomed(true);
    }
  }, [value, zoomed]);

  function handleClick(event) {
    onClick(event.latlng.lat, event.latlng.lng);
    setValue(event.latlng);
  }

  function ClickHandler() {
    useMapEvents({
      click: handleClick,
    });
    return null;
  }

  return (
    <MapContainer
      ref={mapRef}
      center={[18.8137633, -69.5430503]}
      zoom={7.5}
      style={{ height: "400px", zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler />{" "}
      {value && (
        <Marker position={value}>
          <Popup>
            Latitude: {value.lat}
            <br />
            Longitude: {value.lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Mapa;
