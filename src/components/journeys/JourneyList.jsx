function JourneyList({ onSelectJourney, journeys }) {
  if (journeys.length === 0) {
    return (
      <div className="bg-slate-900 p-4 text-white">
        <p>No saved journeys.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 bg-slate-900 p-4 text-white">
      <h2 className="text-lg font-bold">Saved journeys</h2>

      {journeys.map((journey) => (
        <div
          key={journey.id}
          onClick={() => onSelectJourney(journey)}
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
                journey.waypoints.filter((point) => point.type === "mark")
                  .length
              }
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JourneyList;
