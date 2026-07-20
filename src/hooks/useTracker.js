import { useEffect, useState } from "react";

export default function useTracker(location) {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (!location) return;

    setRoute((previous) => [
      ...previous,

      {
        lat: location.latitude,
        lng: location.longitude,
        accuracy: location.accuracy,
        timestamp: Date.now(),
      },
    ]);
  }, [location]);

  return {
    route,
  };
}
