import { useEffect, useState } from "react";
import { locationToPoint, distanceBetween } from "../utils/geo";

export default function useTracker(location) {
  const [route, setRoute] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [waypoints, setWaypoints] = useState([]);

  // Tolerance (m)
  const MIN_DISTANCE = 3;
  const MAX_ACCURACY = 20;

  // Get current point
  function getCurrentPoint() {
    if (!location) return null;

    return locationToPoint(location);
  }

  // Initialize recording
  function startRecording() {
    setRoute([]);
    setWaypoints([]);

    const point = getCurrentPoint();

    if (point) {
      setRoute([point]);
    }

    setIsRecording(true);
  }

  // Add way points
  function addWaypoint() {
    if (!isRecording) return;

    const point = getCurrentPoint();
    if (!point) return;

    setWaypoints((previous) => [...previous, locationToPoint(location)]);
  }

  // Stop recording
  function stopRecording() {
    setIsRecording(false);
  }

  // Clear route
  function clearRoute() {
    setRoute([]);
  }

  // Live update data
  useEffect(() => {
    if (!location) return;
    if (!isRecording) return;

    const newPoint = getCurrentPoint();
    if (!newPoint) return;

    setRoute((previous) => {
      if (previous.length === 0) {
        return [newPoint];
      }

      const lastPoint = previous[previous.length - 1];

      const distance = distanceBetween(lastPoint, newPoint);

      if (newPoint.accuracy > MAX_ACCURACY || distance < MIN_DISTANCE) {
        return previous;
      }

      return [...previous, newPoint];
    });
  }, [location, isRecording]);

  // Add way points
  return {
    route,
    waypoints,
    isRecording,
    startRecording,
    stopRecording,
    addWaypoint,
    clearRoute,
  };
}
