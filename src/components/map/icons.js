import L from "leaflet";

export const startIcon = new L.Icon({
  iconUrl: "/start.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export const markIcon = new L.Icon({
  iconUrl: "/mark.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export const endIcon = new L.Icon({
  iconUrl: "/finish.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});
