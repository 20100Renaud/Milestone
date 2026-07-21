import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { startIcon, markIcon, endIcon } from "../../components/map/icons";


// Associate icons with types
function getIcon(type) {
  switch (type) {
    case "start":
      return startIcon;

    case "end":
      return endIcon;

    default:
      return markIcon;
  }
}


function MapView({ location, route, waypoints, isRecording, selectedWaypoint,
    onSelectWaypoint }) {
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

      {!isRecording && <LocationMarker location={location} />}

      <Polyline
        positions={(route ?? []).map((point) => [
          point.latitude,
          point.longitude,
        ])}
        pathOptions={{
          color: "#2563eb",
          weight: 5,
        }}
      />

      {(waypoints ?? []).map((point) => (
        <Marker
          key={point.id}
          waypoint={point}
          icon={getIcon(point.type)}
          onSelect={onSelectWaypoint}
        />
      ))}
    </MapContainer>
  );
}

export default MapView;
