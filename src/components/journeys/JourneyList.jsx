import { Trash2, Calendar, Route, MapPin } from "lucide-react";
import CollapsiblePanel from "../layout/CollapsiblePanel";

function JourneyList({
  journeys,
  expanded,
  onToggle,
  onSelectJourney,
  onDeleteJourney,
  onClearJourneys,
}) {
  return (
    <>
      {/* Header */}
      <CollapsiblePanel
        title={`History (${journeys.length})`}
        expanded={expanded}
        onToggle={onToggle}
        actions={
          journeys.length > 0 && (
            <button
              onClick={onClearJourneys}
              className="rounded p-2 text-red-400 hover:bg-slate-700"
              title="Delete all journeys"
            >
              <Trash2 size={18} />
            </button>
          )
        }
      >
        {/* List */}

        {journeys.length === 0 ? (
          <p className="p-4 text-center text-slate-400">No saved journeys.</p>
        ) : (
          <div className="space-y-3 p-3">
            <p className="p-1 text-center text-xs text-slate-400">Click to edit a journey.</p>
            {journeys.map((journey) => {
              const marks = journey.waypoints.filter(
                (point) => point.type === "mark",
              ).length;

              return (
                <div
                  key={journey.id}
                  onClick={() => {
                    onSelectJourney(journey);
                    onToggle();
                  }}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-3 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-col items-center gap-2">
                        <p className="font-semibold">{journey.title}</p>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-slate-400" />
                          <p className="text-xs text-slate-400">
                            {new Date(journey.startedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-1">
                          <Route size={16} />
                          {journey.distance >= 1000
                            ? `${(journey.distance / 1000).toFixed(2)} km`
                            : `${journey.distance.toFixed(1)} m`}
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {
                            journey.waypoints.filter(
                              (point) => point.type === "mark",
                            ).length
                          }
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteJourney(journey.id);
                      }}
                      className="rounded p-2 text-red-400"
                      title="Delete journey"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CollapsiblePanel>
    </>
  );
}

export default JourneyList;
