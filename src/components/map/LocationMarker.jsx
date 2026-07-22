import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { locationIcon } from "./icons";

function LocationMarker({ location, follow }) {
  const map = useMap();

  // Update location on each gps income if location and follow are true
  useEffect(() => {
    if (!follow) return;
    if (!location) return;

    map.setView([location.latitude, location.longitude], 16);
  }, [location, follow, map]);

  if (!location) {
    return null;
  }

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={locationIcon}
    >
      <Popup>
        <strong>You are here</strong>
        <br />
        Accuracy: {Math.round(location.accuracy)} m
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
