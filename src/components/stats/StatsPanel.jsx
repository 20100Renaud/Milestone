import { calculateRouteDistance } from "../../utils/distance";

function StatsPanel({ location, error, route, waypoints }) {
  const distance = calculateRouteDistance(route);

  if (!location) {
    return (
      <div className="bg-slate-100 p-4">
        {error && <p>{error}</p>}
        <p>Waiting for GPS...</p>
      </div>
    );
  }

  const accuracyClass =
    location.accuracy < 10
      ? "text-green-500"
      : location.accuracy <= 15
        ? "text-orange-500"
        : "text-red-500";

  return (
    <div className="bg-slate-100 p-4">
      <div className="flex gap-2">
        <p>Lat: {location.latitude.toFixed(6)}</p>
        <p>Lng: {location.longitude.toFixed(6)}</p>
      </div>

      <p className={accuracyClass}>
        Accuracy: {location.accuracy.toFixed(1)} m
      </p>

      <div className="flex gap-2">
        <p>GPS points: {route.length}</p>
        <p>Saved points: {waypoints.length}</p>
        <p>
          Distance:{" "}
          {distance >= 1000
            ? `${(distance / 1000).toFixed(2)} km`
            : `${distance.toFixed(1)} m`}
        </p>
      </div>
    </div>
  );
}

export default StatsPanel;
