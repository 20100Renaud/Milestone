import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";
import WaypointEditor from "./components/waypoints/WaypointEditor";
import { saveJourney } from "./services/storage";

function App() {
  const { location, error } = useLocation();
  const [selectedWaypointId, setSelectedWaypointId] = useState(null);
  const {
    route,
    waypoints,
    journey,
    isRecording,
    startRecording,
    stopRecording,
    addWaypoint,
    updateWaypoint,
  } = useTracker(location);

  const selectedWaypoint =
    waypoints.find((point) => point.id === selectedWaypointId) ?? null;

  // Mark id
  function handleMark() {
    const id = addWaypoint();

    if (id) {
      setSelectedWaypointId(id);
    }
  }

  // Save journey
  useEffect(() => {
    if (!journey) return;

    console.log("Saving journey", journey);
    
    saveJourney(journey);
  }, [journey]);

  return (
    <div className="flex flex-col h-screen bg-black ">
      <Header />

      <main className="flex-1 overflow-hidden">
        <MapView
          location={location}
          route={route}
          waypoints={waypoints}
          isRecording={isRecording}
          selectedWaypoint={selectedWaypoint}
          onSelectWaypoint={setSelectedWaypointId}
        />
      </main>

      <StatsPanel
        location={location}
        error={error}
        route={route}
        waypoints={waypoints}
      />

      <WaypointEditor
        waypoint={selectedWaypoint}
        onSave={updateWaypoint}
        onClose={() => setSelectedWaypointId(null)}
      />

      <Controls
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
        onMark={handleMark}
      />
    </div>
  );
}

export default App;
