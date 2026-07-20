function StatsPanel({ location, error, route }) {
  return (
    <div className="bg-slate-100 p-4">
      {error && <p>{error}</p>}

      {location && (
        <>
          <p>Lat: {location.latitude.toFixed(6)}</p>

          <p>Lng: {location.longitude.toFixed(6)}</p>

          <p>Accuracy: {location.accuracy.toFixed(1)} m</p>

          <p>Recorded points: {route.length}</p>
        </>
      )}
    </div>
  );
}

export default StatsPanel;
