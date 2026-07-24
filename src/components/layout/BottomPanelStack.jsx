import StatsPanel from "../stats/StatsPanel";
import Controls from "../controls/Controls";
import WaypointEditor from "../waypoints/WaypointEditor";
import JourneyDialog from "../journeys/JourneyDialog";
import JourneyPanel from "../journeys/JourneyPanel";
import JourneyList from "../journeys/JourneyList";

export default function BottomPanelStack({
  // data
  location,
  error,
  route,
  waypoints,
  journeys,
  selectedJourney,
  selectedWaypoint,
  pendingJourney,
  isRecording,

  // UI state
  expandedPanel,

  // actions
  onTogglePanel,

  // controls
  onStart,
  onStop,
  onMark,

  // waypoint
  onSelectWaypoint,
  onSaveWaypoint,

  // dialog
  onSaveNewJourney,
  onCancelJourney,

  // selected journey
  onUpdateJourney,
  onExitJourney,

  // history
  onSelectJourney,
  onDeleteJourney,
  onClearJourneys,
}) {
  const editorVisible =
    selectedWaypoint != null && (selectedJourney != null || isRecording);

  const markWaypoints = waypoints.filter((point) => point.type === "mark");

  return (
    <>
      {/* GPS panel */}
      {isRecording && (
        <StatsPanel
          location={location}
          error={error}
          route={route}
          waypoints={waypoints}
          expanded={expandedPanel === "stats"}
          onToggle={() => onTogglePanel("stats")}
        />
      )}

      {/* Controls */}
      {!editorVisible && (
        <Controls
          isRecording={isRecording}
          onStart={onStart}
          onStop={onStop}
          onMark={onMark}
        />
      )}

      {/* Waypoint editor */}
      {editorVisible && (
        <WaypointEditor
          waypoints={markWaypoints}
          selectedWaypoint={selectedWaypoint}
          expanded={expandedPanel === "waypoints"}
          onToggle={() => onTogglePanel("waypoints")}
          onSelectWaypoint={onSelectWaypoint}
          onSave={onSaveWaypoint}
        />
      )}

      {/* Save dialog */}
      <JourneyDialog
        key={pendingJourney?.id}
        journey={pendingJourney}
        onSave={onSaveNewJourney}
        onCancel={onCancelJourney}
      />

      {/* Selected journey */}
      {!isRecording && selectedJourney && (
        <JourneyPanel
          journey={selectedJourney}
          expanded={expandedPanel === "journey"}
          onToggle={() => onTogglePanel("journey")}
          onExit={onExitJourney}
          onSave={onUpdateJourney}
        />
      )}

      {/* History */}
      {!isRecording && !selectedJourney && (
        <JourneyList
          journeys={journeys}
          expanded={expandedPanel === "history"}
          onToggle={() => onTogglePanel("history")}
          onSelectJourney={onSelectJourney}
          onDeleteJourney={onDeleteJourney}
          onClearJourneys={onClearJourneys}
        />
      )}
    </>
  );
}


