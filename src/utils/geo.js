export function locationToPoint(location) {
  return {
    id: crypto.randomUUID(),
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: location.accuracy,
    timestamp: Date.now(),
    type: "mark",
    title: "",
    description: "",
  };
}

// Use Turf later eventually (if too much points)
export function distanceBetween(point1, point2) {
  const R = 6371000; // Earth radius in meters

  const lat1 = (point1.latitude * Math.PI) / 180;
  const lat2 = (point2.latitude * Math.PI) / 180;

  const dLat = ((point2.latitude - point1.latitude) * Math.PI) / 180;

  const dLng = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
