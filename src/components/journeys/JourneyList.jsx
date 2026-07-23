import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Calendar,
  Route,
  MapPin,
  Waypoints,
} from "lucide-react";

function JourneyList({
  journeys,
  open,
  onToggle,
  onSelectJourney,
  onDeleteJourney,
  onClearJourneys,
}) {
  const formatDate = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div className="bg-slate-900 text-white border-t border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 font-semibold"
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          History ({journeys.length})
        </button>

        {journeys.length > 0 && (
          <button
            onClick={onClearJourneys}
            className="rounded p-2 text-red-400"
            title="Delete all journeys"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* List */}
      {open && (
        <div className="max-h-60 overflow-y-auto border-t border-slate-700">
          {journeys.length === 0 ? (
            <p className="p-4 text-center text-slate-400">No saved journeys.</p>
          ) : (
            <div className="space-y-3 p-3">
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
                    className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-3 transition"
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
                            {(journey.distance / 1000).toFixed(2)} km
                          </div>

                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            {
                              journey.waypoints.filter(
                                (point) => point.type === "mark",
                              ).length
                            }
                          </div>

                          <div className="flex items-center gap-1">
                            <Waypoints size={16} />
                            {journey.route.length}
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
        </div>
      )}
    </div>
  );
}

export default JourneyList;
