function StatsPanel({ location, error, route, waypoints }) {
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
        <p>Recorded points: {route.length}</p>
        <p>Waypoints: {waypoints.length}</p>
      </div>
    </div>
  );
}

export default StatsPanel;
