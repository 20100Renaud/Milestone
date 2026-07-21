const STORAGE_KEY = "milestone-journeys";

export function loadJourneys() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function saveJourneys(journeys) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
}
