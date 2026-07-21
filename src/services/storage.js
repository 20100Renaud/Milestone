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

// PUT
export function saveJourney(journey) {
  const journeys = loadJourneys();
  const exists = journeys.some((j) => j.id === journey.id);

  if (exists) return;

  journeys.push(journey);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));

  console.log("Stored journeys:", localStorage.getItem(STORAGE_KEY));
}

// DELETE
export function clearJourneys() {
  localStorage.removeItem(STORAGE_KEY);
}
