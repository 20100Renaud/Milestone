import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";
import WaypointEditor from "./components/waypoints/WaypointEditor";
import JourneyList from "./components/journeys/JourneyList";
import {
  saveJourney,
  loadJourneys,
  deleteJourney,
  clearJourneys,
  updateJourneyWaypoint,
} from "./services/storage";

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
  const [onDeleteJourney, setOnDeleteJourney] = useState(null);
  const [journeys, setJourneys] = useState(loadJourneys);
  const [historyOpen, setHistoryOpen] = useState(false);

  const selectedWaypoint =
    waypoints.find((point) => point.id === selectedWaypointId) ?? null;

  const displayedWaypoints = selectedJourney?.waypoints ?? waypoints;
  const markerCount = displayedWaypoints.filter(
    (point) => point.type === "mark",
  ).length;

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
    setSelectedWaypointId(null);
    startRecording();
  }

  // Save a journey
  useEffect(() => {
    if (!journey) return;

    saveJourney(journey);
    setJourneys(loadJourneys());
  }, [journey]);

  // Update one waypoint inside a journey
  function handleUpdateWaypoint(id, updates) {
    if (selectedJourney) {
      updateJourneyWaypoint(selectedJourney.id, id, updates);

      const updated = loadJourneys();
      setJourneys(updated);

      const refreshedJourney = updated.find(
        (journey) => journey.id === selectedJourney.id,
      );

      setSelectedJourney(refreshedJourney);

      return;
    }

    updateWaypoint(id, updates);
  }

  // Delete a journey
  function handleDeleteJourney(id) {
    deleteJourney(id);

    const updated = loadJourneys();
    setJourneys(updated);

    if (selectedJourney?.id === id) {
      setSelectedJourney(null);
    }
  }

  // Delete all journeys
  function handleClearJourneys() {
    if (!window.confirm("Delete all saved journeys?")) return;

    clearJourneys();
    setJourneys([]);
    setSelectedJourney(null);
  }

  return (
    <div className="flex flex-col h-screen">
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

      {markerCount > 0 && (
        <WaypointEditor
          waypoints={displayedWaypoints.filter(
            (point) => point.type === "mark",
          )}
          selectedWaypoint={selectedWaypoint}
          onSelectWaypoint={setSelectedWaypointId}
          onSave={handleUpdateWaypoint}
          onClose={() => setSelectedWaypointId(null)}
        />
      )}

      <JourneyList
        journeys={journeys}
        open={historyOpen}
        onToggle={() => setHistoryOpen((open) => !open)}
        onSelectJourney={setSelectedJourney}
        onDeleteJourney={handleDeleteJourney}
        onClearJourneys={handleClearJourneys}
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
