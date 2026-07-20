import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import LocationMarker from "./LocationMarker";

function MapView({ location, route }) {

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

      <Polyline
        positions={route.map((point) => [point.latitude, point.longitude])}
        pathOptions={{
          color: "#2563eb",
          weight: 5,
        }}
      />
    </MapContainer>
  );
}

export default MapView;
