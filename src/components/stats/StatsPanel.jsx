import { calculateRouteDistance } from "../../utils/distance";
import { getAccuracyStatus } from "../../utils/gps";
import CollapsiblePanel from "../layout/CollapsiblePanel";

export const accuracyClass = (accuracy) => {
  return getAccuracyStatus(accuracy).className;
};

function StatsPanel({ location, error, route, waypoints, expanded, onToggle }) {
  const distance = calculateRouteDistance(route);

  const accuracy = location?.coords?.accuracy;
  const status = getAccuracyStatus(accuracy);

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

  return (
    <CollapsiblePanel
      title="GPS"
      summary={
        <span className={status.className}>
          {status.label} · ±{accuracy?.toFixed(1)} m
        </span>
      }
      expanded={expanded}
      onToggle={onToggle}
    >
      <div className="space-y-2 text-sm">
        <p>Latitude: {location.coords.latitude.toFixed(6)}</p>
        <p>Longitude: {location.coords.longitude.toFixed(6)}</p>

        <p className={status.className}>
          GPS accuracy: ±{accuracy?.toFixed(1)} m ({status.label})
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
