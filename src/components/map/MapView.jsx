import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import WaypointMarker from "./WaypointMarker";
import LocationMarker from "./LocationMarker";
import { startIcon, markIcon, endIcon } from "../../components/map/icons";
import MapBounds from "./MapBounds";
import SelectedWaypointFollower from "./SelectedWaypointFollower";


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


function MapView({
  location,
  route,
  waypoints,
  isRecording,
  selectedJourney,
  selectedWaypoint,
  onSelectWaypoint,
}) {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={18}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!isRecording && (
        <LocationMarker location={location} follow={!selectedJourney} />
      )}

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

      <MapBounds route={route} />

      {waypoints.map((point) => (
        <WaypointMarker
          key={point.id}
          waypoint={point}
          icon={getIcon(point.type)}
          selected={selectedWaypoint?.id === point.id}
          onSelect={onSelectWaypoint}
        />
      ))}

      <SelectedWaypointFollower waypoint={selectedWaypoint} />
    </MapContainer>
  );
}

export default MapView;
