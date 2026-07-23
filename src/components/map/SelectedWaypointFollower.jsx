import { useEffect } from "react";
import { useMap } from "react-leaflet";

function SelectedWaypointFollower({ waypoint }) {
  const map = useMap();

  useEffect(() => {
    if (!waypoint) return;

    map.flyTo([waypoint.latitude, waypoint.longitude], map.getZoom(), {
      duration: 0.5,
    });
  }, [waypoint, map]);

  return null;
}

export default SelectedWaypointFollower;
