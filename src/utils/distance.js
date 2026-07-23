import { distanceBetween } from "./geo";

export function calculateRouteDistance(route) {
  if (!route || route.length < 2) {
    return 0;
  }

  let total = 0;

  for (let i = 1; i < route.length; i++) {
    total += distanceBetween(route[i - 1], route[i]);
  }

  return total;
}
