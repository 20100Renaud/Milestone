function JourneyList({
  journeys,
  open,
  onToggle,
  onSelectJourney,
  onDeleteJourney,
  onClearJourneys,
}) {
  return (
    <div className="bg-slate-900 text-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4"
      >
        <span className="font-bold">History ({journeys.length})</span>

        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="flex justify-between items-center max-h-56  overflow-y-auto border-t border-slate-700 p-4">
          <h2 className="text-lg font-bold">Saved journeys</h2>

          <button
            onClick={onClearJourneys}
            className="rounded bg-red-800 px-3 py-1 text-sm"
          >
            🗑 Clear history
          </button>

          {journeys.length === 0 ? (
            <p>No saved journeys.</p>
          ) : (
            <div className="space-y-2">
              {journeys.map((journey) => (
                <div
                  key={journey.id}
                  onClick={() => {
                    onSelectJourney(journey);
                    onToggle();
                  }}
                  className="rounded bg-slate-800 p-3"
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteJourney(journey.id);
                    }}
                    className="rounded bg-red-700 px-2 py-1 text-sm"
                  >
                    🗑 Delete this journey
                  </button>
                  <p className="font-semibold">
                    {new Date(journey.startedAt).toLocaleString()}
                  </p>

                  <div className="mt-2 text-sm text-slate-300">
                    <p>Route points: {journey.route.length}</p>

                    <p>
                      Waypoints:{" "}
                      {
                        journey.waypoints.filter(
                          (point) => point.type === "mark",
                        ).length
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JourneyList;
