import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

function LocationMarker({ location }) {
  // add follow={ !selectedJourney } if on an old journey, the map jump back to the current location

  // Update location on each gps new response
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
        <strong>You are here</strong>
        <br />
        Accuracy: {Math.round(location.accuracy)} m
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
