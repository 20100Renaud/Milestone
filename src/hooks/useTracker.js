import { useEffect, useState } from "react";
import { locationToPoint, distanceBetween } from "../utils/geo";

export default function useTracker(location) {
  const [route, setRoute] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // Tolerance
  const MIN_DISTANCE = 3;
  const MAX_ACCURACY = 20;

  // Stop recording
  function stopRecording() {
    setIsRecording(false);
  }

  // Clear route
  function clearRoute() {
    setRoute([]);
  }

  // Start recodering
  function startRecording() {
    setRoute([]);

    if (location) {
      setRoute([locationToPoint(location)]);
    }

    setIsRecording(true);
  }

  // Live update data
  useEffect(() => {
    if (!location) return;
    if (!isRecording) return;

    const newPoint = locationToPoint(location);

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

  return {
    route,
    isRecording,
    startRecording,
    stopRecording,
    clearRoute,
  };
}
