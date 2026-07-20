import { useEffect, useState } from "react";
import { locationToPoint } from "../utils/geo";

export default function useTracker(location) {
  const [route, setRoute] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

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

    setRoute((previous) => [...previous, locationToPoint(location)]);
  }, [location, isRecording]);

  return {
    route,
    isRecording,
    startRecording,
    stopRecording,
    clearRoute,
  };
}
