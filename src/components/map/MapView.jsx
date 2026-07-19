import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import useLocation from "../../hooks/useLocation";

function MapView() {
  const { location } = useLocation();

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={16}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker location={location} />
    </MapContainer>
  );
}

export default MapView;
