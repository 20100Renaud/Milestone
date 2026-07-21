import L from "leaflet";

// Change default makers from leaflet

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: `${import.meta.env.BASE_URL}start.png`,
  iconUrl: `${import.meta.env.BASE_URL}start.png`,
  shadowUrl: `${import.meta.env.BASE_URL}start.png`,
});
