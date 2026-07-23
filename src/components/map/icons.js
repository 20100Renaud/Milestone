import L from "leaflet";

const base = import.meta.env.BASE_URL;

export const startIcon = new L.Icon({
  iconUrl: `${base}start.png`,
  iconSize: [20, 20],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export const locationIcon = new L.Icon({
  iconUrl: `${base}location.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export const markIcon = new L.Icon({
  iconUrl: `${base}mark.png`,
  iconSize: [20, 20],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

export const endIcon = new L.Icon({
  iconUrl: `${base}finish.png`,
  iconSize: [20, 20],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});
