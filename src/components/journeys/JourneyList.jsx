function JourneyList({ journeys, open, onToggle, onSelectJourney }) {
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
        <div className="max-h-56 overflow-y-auto border-t border-slate-700 p-4">
          <h2 className="mb-2 text-lg font-bold">Saved journeys</h2>

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
