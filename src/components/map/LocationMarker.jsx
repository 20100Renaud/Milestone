import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

function LocationMarker({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 16);
    }
  }, [location, map]);

  if (!location) {
    return null;
  }

  return (
    <Marker position={[location.latitude, location.longitude]}>
      <Popup>
        You are here
        <br />
        Accuracy: {Math.round(location.accuracy)}m
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
