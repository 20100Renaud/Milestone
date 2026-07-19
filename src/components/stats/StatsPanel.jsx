import useLocation from "../../hooks/useLocation";

function StatsPanel() {
  const { location, error } = useLocation();

  return (
    <div className="bg-slate-100 p-4">
      {error && <p>{error}</p>}

      {location && (
        <>
          <p>Lat: {location.latitude}</p>

          <p>Lng: {location.longitude}</p>

          <p>Accuracy: {location.accuracy}m</p>
        </>
      )}
    </div>
  );
}

export default StatsPanel;
