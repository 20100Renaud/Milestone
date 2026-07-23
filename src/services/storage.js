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

// SAVE THE JOURNEY
export function saveJourney(journey) {
  const journeys = loadJourneys();
  const exists = journeys.some((j) => j.id === journey.id);

  if (exists) return;

  journeys.push(journey);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));

  console.log("Stored journeys:", localStorage.getItem(STORAGE_KEY));
}

// UPDATE A JOURNEY
export function updateJourney(id, updates) {
  const journeys = loadJourneys().map((journey) =>
    journey.id === id ? { ...journey, ...updates } : journey,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
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
