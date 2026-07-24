import { calculateRouteDistance } from "../../utils/distance";
import CollapsiblePanel from "../layout/CollapsiblePanel";

function StatsPanel({ location, error, route, waypoints, expanded, onToggle }) {
  const distance = calculateRouteDistance(route);

  if (!location) {
    return (
      <CollapsiblePanel
        title="GPS"
        summary="Waiting for GPS..."
        expanded={expanded}
        onToggle={onToggle}
      >
        {error && <p>{error}</p>}
      </CollapsiblePanel>
    );
  }

  const accuracyClass =
    location.accuracy < 10
      ? "text-green-400"
      : location.accuracy <= 15
        ? "text-orange-400"
        : "text-red-400";

  return (
    <CollapsiblePanel
      title="GPS"
      summary={
        <span className={accuracyClass}>
          Accuracy {location.accuracy.toFixed(1)} m
        </span>
      }
      expanded={expanded}
      onToggle={onToggle}
    >
      <div className="space-y-2 text-sm">
        <p>Latitude: {location.latitude.toFixed(6)}</p>
        <p>Longitude: {location.longitude.toFixed(6)}</p>

        <p className={accuracyClass}>
          Accuracy: {location.accuracy.toFixed(1)} m
        </p>

        <p>GPS points: {route.length}</p>
        <p>Markers: {waypoints.length}</p>

        <p>
          Distance{" "}
          {distance >= 1000
            ? `${(distance / 1000).toFixed(2)} km`
            : `${distance.toFixed(1)} m`}
        </p>
      </div>
    </CollapsiblePanel>
  );
}

export default StatsPanel;
