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

// Save JOURNEY
export function saveJourney(journey) {
  const journeys = loadJourneys();
  const exists = journeys.some((j) => j.id === journey.id);

  if (exists) return;

  journeys.push(journey);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));

  console.log("Stored journeys:", localStorage.getItem(STORAGE_KEY));
}

// UPDATE JOURNEY
export function updateJourney(id, updates) {
  const journeys = loadJourneys().map((journey) =>
    journey.id === id ? { ...journey, ...updates } : journey,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
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
