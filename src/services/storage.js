const STORAGE_KEY = "milestone-journeys";

// GET
export function loadJourneys() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// CREATE OR UPDATE JOURNEY
export function saveJourney(journey) {
  const journeys = loadJourneys();

  const exists = journeys.some(
    (item) => item.id === journey.id
  );

  const updatedJourneys = exists
    ? journeys.map((item) =>
        item.id === journey.id
          ? { ...item, ...journey }
          : item,
      )
    : [...journeys, journey];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJourneys),
  );

  console.log(
    "Stored journeys:",
    localStorage.getItem(STORAGE_KEY),
  );
}

// UPDATE ONE WAYPOINT INSIDE A JOURNEY
export function updateJourneyWaypoint(journeyId, waypointId, updates) {
  const journeys = loadJourneys();

  const updatedJourneys = journeys.map((journey) => {
    if (journey.id !== journeyId) {
      return journey;
    }

    return {
      ...journey,
      waypoints: journey.waypoints.map((point) =>
        point.id === waypointId
          ? { ...point, ...updates }
          : point,
      ),
    };
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJourneys),
  );
}
// DELETE ALL JOURNEYS
export function clearJourneys() {
  localStorage.removeItem(STORAGE_KEY);
}

// DELETE ONE JOURNEY
export function deleteJourney(id) {
  const journeys = loadJourneys().filter((journey) => journey.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
}
