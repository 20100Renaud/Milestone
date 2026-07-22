import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (!route || route.length === 0) return;

    if (route.length === 1) {
      map.setView([route[0].latitude, route[0].longitude], 17);
      return;
    }

    const bounds = route.map((point) => [point.latitude, point.longitude]);

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [route, map]);

  return null;
}

export default MapBounds;
