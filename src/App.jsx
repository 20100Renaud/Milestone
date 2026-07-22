import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";
import WaypointEditor from "./components/waypoints/WaypointEditor";
import { saveJourney, loadJourneys } from "./services/storage";
import JourneyList from "./components/journeys/JourneyList";

function App() {
  const { location, error } = useLocation();
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

  const [selectedWaypointId, setSelectedWaypointId] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [journeys, setJourneys] = useState(loadJourneys);
  const [historyOpen, setHistoryOpen] = useState(false);

  const selectedWaypoint =
    waypoints.find((point) => point.id === selectedWaypointId) ?? null;


  // Mark id
  function handleMark() {
    const id = addWaypoint();

    if (id) {
      setSelectedWaypointId(id);
    }
  }

  // Manage start
  function handleStart() {
    setSelectedJourney(null);
    startRecording();
  }

  // Save journey
  useEffect(() => {
    if (!journey) return;

    saveJourney(journey);
    setJourneys(loadJourneys());
  }, [journey]);

  return (
    <div className="flex flex-col h-screen bg-black ">
      <Header />

      <main className="flex-1 overflow-hidden">
        <MapView
          location={location}
          route={selectedJourney?.route ?? route}
          waypoints={selectedJourney?.waypoints ?? waypoints}
          isRecording={isRecording}
          selectedJourney={selectedJourney}
          selectedWaypoint={selectedWaypoint}
          onSelectWaypoint={setSelectedWaypointId}
        />
      </main>

      <StatsPanel
        location={location}
        error={error}
        route={selectedJourney?.route ?? route}
        waypoints={selectedJourney?.waypoints ?? waypoints}
      />

      <WaypointEditor
        waypoint={selectedWaypoint}
        onSave={updateWaypoint}
        onClose={() => setSelectedWaypointId(null)}
      />

      <JourneyList
        journeys={journeys}
        open={historyOpen}
        onToggle={() => setHistoryOpen((open) => !open)}
        onSelectJourney={setSelectedJourney}
      />

      <Controls
        isRecording={isRecording}
        onStart={handleStart}
        onStop={stopRecording}
        onMark={handleMark}
      />
    </div>
  );
}

export default App;
