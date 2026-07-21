import { Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";

function WaypointMarker({ waypoint, icon, selected, onSelect }) {
  const markerRef = useRef(null);

  // Select the current mark
  useEffect(() => {
    if (selected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [selected]);

  return (
    <Marker
      ref={markerRef}
      position={[waypoint.latitude, waypoint.longitude]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(waypoint.id),
      }}
    >
      <Popup>
        <div className="min-w-48">
          <h3 className="font-bold">{waypoint.title || "Untitled waypoint"}</h3>

          {waypoint.description && (
            <p className="mt-2">{waypoint.description}</p>
          )}

          <p className="mt-3 text-xs text-gray-500">{waypoint.type}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default WaypointMarker;
