import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import StatsPanel from "../stats/StatsPanel";
import Controls from "../controls/Controls";
import WaypointEditor from "../waypoints/WaypointEditor";
import JourneyDialog from "../journeys/JourneyDialog";
import JourneyPanel from "../journeys/JourneyPanel";
import JourneyList from "../journeys/JourneyList";

function BottomPanelStack(
  {
    location,
    error,
    route,
    waypoints,
    journeys,
    selectedJourney,
    selectedWaypoint,
    pendingJourney,
    isRecording,

    onStart,
    onStop,
    onMark,

    onSelectWaypoint,
    onSaveWaypoint,

    onSaveJourney,
    onCancelJourney,

    onExitJourney,
    onUpdateJourney,

    onSelectJourney,
    onDeleteJourney,
    onClearJourneys,

    resetKeys = [],
  },
  ref,
) {
  const [expandedPanel, setExpandedPanel] = useState(null);

  // Manage visibility
  const editorVisible =
    selectedWaypoint != null && (selectedJourney != null || isRecording);

  const markWaypoints = waypoints.filter((p) => p.type === "mark");

  function togglePanel(panel) {
    setExpandedPanel((current) => (current === panel ? null : panel));
  }

  function openPanel(panel) {
    setExpandedPanel(panel);
  }

  function closePanel() {
    setExpandedPanel(null);
  }

  useImperativeHandle(ref, () => ({
    openPanel,
    closePanel,
  }));

  useEffect(() => {
    setExpandedPanel(null);
  }, resetKeys);

  return (
    <>
      {isRecording && (
        <StatsPanel
          location={location}
          error={error}
          route={route}
          waypoints={waypoints}
          expanded={expandedPanel === "stats"}
          onToggle={() => togglePanel("stats")}
        />
      )}

      {!editorVisible && (
        <Controls
          isRecording={isRecording}
          onStart={onStart}
          onStop={onStop}
          onMark={onMark}
        />
      )}

      {editorVisible && (
        <WaypointEditor
          waypoints={markWaypoints}
          selectedWaypoint={selectedWaypoint}
          expanded={expandedPanel === "waypoints"}
          onToggle={() => togglePanel("waypoints")}
          onSelectWaypoint={onSelectWaypoint}
          onSave={onSaveWaypoint}
        />
      )}

      <JourneyDialog
        key={pendingJourney?.id}
        journey={pendingJourney}
        onSave={onSaveJourney}
        onCancel={onCancelJourney}
      />

      {!isRecording && selectedJourney && (
        <JourneyPanel
          journey={selectedJourney}
          expanded={expandedPanel === "journey"}
          onToggle={() => togglePanel("journey")}
          onExit={onExitJourney}
          onSave={onUpdateJourney}
        />
      )}

      {!isRecording && !selectedJourney && (
        <JourneyList
          journeys={journeys}
          expanded={expandedPanel === "history"}
          onToggle={() => togglePanel("history")}
          onSelectJourney={onSelectJourney}
          onDeleteJourney={onDeleteJourney}
          onClearJourneys={onClearJourneys}
        />
      )}
    </>
  );
}

export default forwardRef(BottomPanelStack);
