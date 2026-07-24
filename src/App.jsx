import { useRef, useState, useEffect } from "react";
import Header from "./components/layout/Header";
import MapView from "./components/map/MapView";
import useLocation from "./hooks/useLocation";
import useTracker from "./hooks/useTracker";
import BottomPanelStack from "./components/layout/BottomPanelStack";
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
  const bottomPanelRef = useRef(null);

  const displayedWaypoints = selectedJourney?.waypoints ?? waypoints;
  const selectedWaypoint =
    displayedWaypoints.find((point) => point.id === selectedWaypointId) ?? null;

  // Default journey title
  const nextNumber =
    journeys.reduce((max, journey) => {
      const match = journey.title?.match(/^Journey #(\d+)$/);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1;

  // Actions on mark btn
  function handleMark() {
    const id = addWaypoint();
    if (!id) return;

    setSelectedWaypointId(id);
    bottomPanelRef.current?.openPanel("waypoints");
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
  }

  // Exit a journey
  function handleExitJourney() {
    setSelectedJourney(null);
    setSelectedWaypointId(null);
  }

  // Select a waypoint
  function handleSelectWaypoint(id) {
    setSelectedWaypointId(id);
  }

  // Save a journey
  useEffect(() => {
    if (!journey) return;

    setPendingJourney(journey);
  }, [journey]);

  // Save a new recorded journey
  function handleSaveNewJourney(title, description) {
    saveJourney({
      ...pendingJourney,
      title: title || `Journey #${nextNumber}`,
      description,
    });

    setJourneys(loadJourneys());
    setPendingJourney(null);
  }

  // Update an existing saved journey
  function handleUpdateJourney(updates) {
    if (!selectedJourney) return;

    const updatedJourney = {
      ...selectedJourney,
      ...updates,
    };

    saveJourney(updatedJourney);

    const updated = loadJourneys();

    setJourneys(updated);

    const refreshedJourney = updated.find(
      (journey) => journey.id === selectedJourney.id,
    );

    setSelectedJourney(refreshedJourney);
  }

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
      bottomPanelRef.current?.closePanel();

      return;
    }

    updateWaypoint(id, updates);
    bottomPanelRef.current?.closePanel();
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
    <div className="flex flex-col h-screen bg-gray-200">
      <Header />

      {/* Map */}
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

      {/* Pannels */}

      <BottomPanelStack
        ref={bottomPanelRef}
        resetKeys={[selectedJourney?.id, isRecording]}
        location={location}
        error={error}
        route={route}
        waypoints={displayedWaypoints}
        journeys={journeys}
        selectedJourney={selectedJourney}
        selectedWaypoint={selectedWaypoint}
        pendingJourney={pendingJourney}
        isRecording={isRecording}
        onStart={handleStart}
        onStop={stopRecording}
        onMark={handleMark}
        onSelectWaypoint={handleSelectWaypoint}
        onSaveWaypoint={handleUpdateWaypoint}
        onSaveJourney={handleSaveNewJourney}
        onCancelJourney={() => setPendingJourney(null)}
        onExitJourney={handleExitJourney}
        onUpdateJourney={handleUpdateJourney}
        onSelectJourney={handleSelectJourney}
        onDeleteJourney={handleDeleteJourney}
        onClearJourneys={handleClearJourneys}
      />
    </div>
  );
}

export default App;
