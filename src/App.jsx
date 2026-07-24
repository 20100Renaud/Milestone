import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import StatsPanel from "./components/stats/StatsPanel";
import Controls from "./components/controls/Controls";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";
import WaypointEditor from "./components/waypoints/WaypointEditor";
import JourneyDialog from "./components/journeys/JourneyDialog";
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
  const [journeys, setJourneys] = useState(loadJourneys);
  const [pendingJourney, setPendingJourney] = useState(null);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [editorExpanded, setEditorExpanded] = useState(false);

  const displayedWaypoints = selectedJourney?.waypoints ?? waypoints;
  const selectedWaypoint =
    displayedWaypoints.find((point) => point.id === selectedWaypointId) ?? null;

  const markerCount = displayedWaypoints.filter(
    (point) => point.type === "mark",
  ).length;

  // Default journey title
  const nextNumber =
    journeys.reduce((max, journey) => {
      const match = journey.title?.match(/^Journey #(\d+)$/);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1;

  // Mark id
  function handleMark() {
    const id = addWaypoint();

    if (!id) return;

    setSelectedWaypointId(id);
    setEditorExpanded(true);
  }

  // Manage start
  function handleStart() {
    setSelectedJourney(null);
    setSelectedWaypointId(null);
    startRecording();
  }

  // Select a journey
  function handleSelectJourney(journey) {
    setSelectedJourney(journey);

    const firstMark = journey.waypoints.find((p) => p.type === "mark");

    setSelectedWaypointId(firstMark?.id ?? null);
    setEditorExpanded(false);
  }

  // Select a waypoint
  function handleSelectWaypoint(id) {
    setSelectedWaypointId(id);

    if (selectedJourney) {
      setEditorExpanded(true);
    }
  }

  // Save a journey
  useEffect(() => {
    if (!journey) return;

    setPendingJourney(journey);
  }, [journey]);

  function handleSaveJourney(title, description) {
    saveJourney({
      ...pendingJourney,
      title: title || `Journey #${nextNumber}`,
      description,
    });

    setJourneys(loadJourneys());
    setPendingJourney(null);
  }

  // Manage editor visibility
  const editorVisible =
    selectedWaypoint != null &&
    (selectedJourney != null || (isRecording && editorExpanded));

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
      setEditorExpanded(false);

      return;
    }

    updateWaypoint(id, updates);
    setEditorExpanded(false);

    if (!selectedJourney) {
      setSelectedWaypointId(null);
    }
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
          onSelectWaypoint={handleSelectWaypoint}
        />
      </main>

      <StatsPanel
        location={location}
        error={error}
        route={selectedJourney?.route ?? route}
        waypoints={selectedJourney?.waypoints ?? waypoints}
      />

      {!editorVisible && (
        <Controls
          isRecording={isRecording}
          onStart={handleStart}
          onStop={stopRecording}
          onMark={handleMark}
        />
      )}

      {editorVisible && (
        <WaypointEditor
          waypoints={displayedWaypoints.filter(
            (point) => point.type === "mark",
          )}
          selectedWaypoint={selectedWaypoint}
          expanded={editorExpanded}
          onToggle={() => setEditorExpanded((v) => !v)}
          onSelectWaypoint={setSelectedWaypointId}
          onSave={handleUpdateWaypoint}
        />
      )}

      <JourneyDialog
        key={pendingJourney?.id}
        journey={pendingJourney}
        onSave={handleSaveJourney}
        onCancel={() => setPendingJourney(null)}
      />

      {!isRecording && (
        <JourneyList
          journeys={journeys}
          open={historyOpen}
          onToggle={() => setHistoryOpen((open) => !open)}
          onSelectJourney={handleSelectJourney}
          onDeleteJourney={handleDeleteJourney}
          onClearJourneys={handleClearJourneys}
        />
      )}
    </div>
  );
}

export default App;
