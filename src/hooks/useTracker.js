import { useEffect, useState } from "react";
import { locationToPoint, distanceBetween } from "../utils/geo";
import { calculateRouteDistance } from "../utils/distance";

export default function useTracker(location) {
  const [route, setRoute] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [journey, setJourney] = useState(null);

  // Tolerance (m)
  const MIN_DISTANCE = 3;
  const MAX_ACCURACY = 20;

  // Get current point
  function getCurrentPoint() {
    if (!location) return null;

    return locationToPoint(location);
  }

  // Create waypoint
  function createWaypoint(type, extra = {}) {
    const point = getCurrentPoint();

    if (!point) return null;

    return {
      ...point,
      type,
      ...extra,
    };
  }

  // Initialize recording
  function startRecording() {
    setRoute([]);
    setWaypoints([]);

    const startPoint = createWaypoint("start");

    if (!startPoint) return;

    setRoute([startPoint]);
    setWaypoints([startPoint]);
    setIsRecording(true);
  }

  // Add way points
  function addWaypoint() {
    if (!isRecording) return null;

    const point = createWaypoint("mark", {
      title: "",
      description: "",
    });

    if (!point) return null;

    setWaypoints((prev) => [...prev, point]);

    return point.id;
  }

  // Update a waypoint
  function updateWaypoint(id, updates) {
    setWaypoints((previous) =>
      previous.map((point) =>
        point.id === id ? { ...point, ...updates } : point,
      ),
    );
  }

  // Stop recording
  function stopRecording() {
    if (!isRecording) return;

    const endPoint = createWaypoint("end");

    const completedWaypoints = endPoint ? [...waypoints, endPoint] : waypoints;

    const completedJourney = {
      id: crypto.randomUUID(),
      title: new Date().toLocaleString(),
      startedAt: route[0]?.timestamp ?? Date.now(),
      endedAt: Date.now(),
      route,
      waypoints: completedWaypoints,
      distance: calculateRouteDistance(route),
    };

    setWaypoints(completedWaypoints);
    setJourney(completedJourney);
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

  return {
    route,
    waypoints,
    journey,
    isRecording,
    startRecording,
    stopRecording,
    addWaypoint,
    updateWaypoint,
    clearRoute,
  };
}
